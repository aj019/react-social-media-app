const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password,{min: 6,max: 30})){
        errors.name = 'Password should be min 6 characters';
   }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}