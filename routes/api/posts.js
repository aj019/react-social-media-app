const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../models/Posts');
const Profile = require('../models/Profile');

const validatePostInput = require('../../validation/post');

const router = express.Router();

//@route GET /api/posts/test
//@desc Test Post Route
//@access Public
router.get('/test',(req,res) => res.json({msg:'Router Works'}));

//@route POST /api/post
//@desc Create Post
//@access Private

router.post('/',passport.authenticate('jwt',{session:false}), (req,res) => {

    const {errors,isValid} = validatePostInput(req.body);

    if(!isValid){
        res.status(404).json(errors);
    }

    const newPost = new Post({
        text : req.body.text,
        name : req.body.name,
        avatar : req.body.avatar,
        user : req.user.id
    })

    newPost.save().then((post) => {
       return res.json(post)
    }).catch((err) => {
        return res.status(404).json(err)
    });
});

//@route GET /api/post/:post_id
//@desc Get Post by id
//@access Private


router.get('/:post_id',passport.authenticate('jwt',{session:false}), (req,res) => {


    Post.findOne({_id: req.params.post_id})
        .then(post => {
            if(!post){
              return  res.status(404).json({post: 'No Post found with this id'});
            }

            return res.json(post);
        }).catch(err => res.status(404).json(err))
});

//@route GET /api/post/all
//@desc Get all posts
//@access Private

router.get('/',passport.authenticate('jwt',{session:false}), (req,res) => {


    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts)).catch(err => res.status(404).json(err));
});

//@route DELETE /api/post/:post_id
//@desc DELETE POST by id
//@access Private

router.delete('/:post_id',passport.authenticate('jwt',{session: false}), (req,res) => {

    Profile.findOne({_id: req.user.id})
        .then(profile =>{
            Post.findOne({_id: req.params.post_id})
            .then(post => {
                if(post.user.toString() !== req.user.id){
                    return res.status(401).json({notauthorised: 'User not authorised'});
                }

                post.remove().then(() => res.json({success: 'true'}))
            }).catch(err => res.status(404).json(err));
        }).catch(err => res.status(404).json(err));

});


//@route POST /api/post/like/:post_id
//@desc Like post by id
//@access Private

router.post('/like/:post_id',passport.authenticate('jwt',{session: false}), (req,res) => {

    Profile.findOne({_id: req.user.id})
        .then(profile =>{
            Post.findOne({_id: req.params.post_id})
            .then(post => {
                
                if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({alreadyLiked: 'Already liked the post'})
                }    

                //Add user id to post likes
                post.likes.unshift({ user : req.user.id});

                post.save().then(post => res.json(post))

            }).catch(err => res.status(404).json({err:'Post Not Found'}));
        }).catch(err => res.status(404).json(err));

});

//@route POST /api/post/unlike/:post_id
//@desc UnLike post by id
//@access Private

router.post('/unlike/:post_id',passport.authenticate('jwt',{session: false}), (req,res) => {

    Profile.findOne({_id: req.user.id})
        .then(profile =>{
            Post.findOne({_id: req.params.post_id})
            .then(post => {
                
                if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({notLiked: 'You haven\'t liked this post'})
                }    

                //Find Index of
                var removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

                // Remove
                post.likes.splice(removeIndex,1);

                //Save
                post.save().then(post => res.json(post));

            }).catch(err => res.status(404).json({err:'Post Not Found'}));
        }).catch(err => res.status(404).json(err));

});


module.exports = router;