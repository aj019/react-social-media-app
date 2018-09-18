const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput  = require('../../validation/profile');
const validateExperienceInput  = require('../../validation/experience');
const validateEducationInput  = require('../../validation/education');
//Load Profile Model
const Profile = require('../models/Profile')

//Load User Model
const User = require('../models/User')


//@route GET /api/users/test
//@desc Test Post Route
//@access  
router.get('/test',(req,res) => res.json({msg:'Router Works'}));

//@route GET /api/profile
//@desc Get Current user profile
//@access Private

router.get('/',passport.authenticate('jwt',{ session: false}),(req,res) =>{
    
    const errors = {};
    Profile.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then( profile => {
        if(!profile){
            errors.noProfile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.status(200).json(profile);

    })
    .catch(err =>{
        return res.status(404).json(err);
    });
});

//@route GET /api/profile/all
//@desc Get all profiles as an array
//@access Public

router.get('/all',(req,res) => {

    Profile.find()
    .populate('user',['name','avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noProfile = 'There are no profiles';
            return res.status(404).json(errors);
        }
        res.json(profiles)
    }).catch(err =>{
        return res.status(404).json({profile: err});
    });

});


//@route GET /api/profile/handle/:handle
//@desc Get user profile by handle
//@access Public


router.get('/handle/:handle',(req,res) =>{

    const errors = {};
    Profile.findOne({handle: req.params.handle})
    .then(profile =>{
        if(!profile){
            errors.noProfile = 'There is no profile by this handle'
            return res.status(404).json(errors);
        }
        return res.status(200).json(profile)
    })
    .catch(err => {
        return res.status(404).json(err);
    })
});

//@route GET /api/profile/user/:user_id
//@desc Get user profile by user id
//@access Public


router.get('/user/:user_id',(req,res) =>{

    const errors = {};
    Profile.findOne({_id: req.params.user_id})
    .then(profile =>{
        if(!profile){
            errors.noProfile = 'There is no profile by this handle'
            return res.status(404).json(errors);
        }
        return res.status(200).json(profile)
    })
    .catch(err => {
        return res.status(404).json(err);
    })
});


//@route POST /api/profile
//@desc Create or edit user profile
//@access Private

router.post('/',passport.authenticate ('jwt',{ session: false}),(req,res) =>{
  
    const {errors,isValid} = validateProfileInput(req.body);

    if(!isValid){
        return res.status(404).json(errors);
    }

    const profileFields = {}
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Add Skills
    if(typeof req.body.skills !== undefined)
        profileFields.skills = req.body.skills.split(',');

    // Add Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

  
    Profile.findOne({user: req.user.id}).then(profile =>{
        if(profile){
        //Update

            Profile.findOneAndUpdate({
                user: req.user.id
            },{
                $set: profileFields
            },{
                new : true
            }).then(profile => res.json(profile))
        }else{
            //Create

            //Check Handle
            Profile.findOne({handle: profileFields.handle}).then(profile => {
                if(profile){
                    errors.handle = 'That handle already exists';
                    return res.status(404).json(errors)
                }
                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })

});


//@route POST /api/profile/experience
//@desc Add experience to profile
//@access Private

router.post('/experience',passport.authenticate('jwt',{session: false, }), (req,res) =>{

    const {errors,isValid} = validateExperienceInput(req.body);

    if(!isValid){
        return res.status(404).json(errors);
    }

    Profile.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then(profile =>{
        const newExp = {
            title : req.body.title,
            company : req.body.company,
            location : req.body.location,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description,
        }

        // Add to experience array
        profile.experience.unshift(newExp);

        profile.save().then(profile => {
            return res.json(profile);
        });

    })

});

//@route POST /api/profile/education
//@desc Add education to profile
//@access Private

router.post('/education',passport.authenticate('jwt',{session: false, }), (req,res) =>{

    const {errors,isValid} = validateEducationInput(req.body);

    if(!isValid){
        return res.status(404).json(errors);
    }

    Profile.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then(profile =>{
        const newEdu = {
            school : req.body.school,
            degree : req.body.degree,
            fieldofstudy : req.body.fieldofstudy,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description,
        }

        // Add to experience array
        profile.education.unshift(newEdu);

        profile.save().then(profile => {
            return res.json(profile);
        });

    })

});


//@route DELETE /api/profile/education/:id
//@desc Delete education from profile by id
//@access Private


router.delete('/education/:exp_id',passport.authenticate('jwt',{session: false, }), (req,res) =>{

    
    Profile.findOne({user: req.user.id})
    .then(profile =>{
        
        if(!profile){
            res.status(404).json({profile: 'Profile not found'});
        }

        //Find index to be removed
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id);

        //Splice item from array
        profile.education.splice(removeIndex,1);

        //Save profile
        profile.save().then(profile =>{
            res.json(profile);
        }).catch(err => res.status(404).json(err));


    }).catch(err => res.status(404).json(err))

});

//@route DELETE /api/profile
//@desc Delete Profile and user
//@access Private


router.delete('/',passport.authenticate('jwt',{session: false, }), (req,res) =>{

   Profile.findOneAndRemove({user: req.user.id})
            .then(() => {
                User.findOneAndRemove({ _id : req.user.id}).then(() =>{
                    res.json({success:true});
                })
            })

});

module.exports = router;