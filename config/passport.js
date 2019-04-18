const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose')
const User = require('../routes/models/User')
const keys = require('./keys_aws');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    if(!user){
                        return done(null,false);
                    }else{
                        return done(null,user);
                    }
                }).catch(err => console.log(err))
    })); 
}