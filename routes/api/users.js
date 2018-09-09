const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
//Load User Model
const User  = require('../models/User');



//@route GET /api/users/test
//@desc Test user Route
//@access Public

router.get('/test',(req,res) => res.json({msg:'Router Works'}));

//@route GET /api/users/register
//@desc To Register a new user
//@access Public

router.post('/register',(req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(404).json({email: 'Email id already exists'})
        }else{

            const avatar = gravatar.url(req.body.email,{
                s: '200',
                r: 'pg',
                d: 'mm'    
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
                 
            }); 

            bcrypt.genSalt(10, (error,salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if(err){
                          throw err;
                     }  
                     
                     newUser.password = hash;
                     newUser.save()
                     .then((user) => {
                         res.json(user);
                     })
                     .catch(err => console.log(err));
                     ;
                });
            });

        }
    });  
});

//@route GET /api/users/login
//@desc To login user / Returning JWT Token
//@access Public

router.post('/login',(req,res) => {

    const email = req.body.email;
    const password = req.body.password;

    //Find User by email and then match the password

     User.findOne({email})
         .then(user => {
             if(!user){
                 return res.status(404).json({email:'User Not Found'});
             }

             //Check Password
             bcrypt.compare(password,user.password)
                    .then(isMatch => {
                        if(isMatch){
                            //User Matched
                            const payload = { id: user.id, name: user.name, avatar: user.avatar}
                            //Json Token Generation
                            jwt.sign(payload,config.secretOrKey, { expiresIn : 3600 },(err,token) =>{
                                if(!err){
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token  
                                    });
                                }else{
                                    res.json({msg: 'Error generating token'});
                                }
                            });

                        }else{ 
                            res.status(400).json({msg: 'Password Incorrect'});
                        }
                    })


         })   

})


module.exports = router;