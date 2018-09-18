const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.handle,{min: 2,max: 30})){
        errors.handle = 'Handle should be more than 2 characters';
   }

   if(Validator.isEmpty(data.handle)){
       errors.handle = 'Profile handle is required';
   }

   if(Validator.isEmpty(data.status)){
    errors.status = 'status is required';
    }


    if(Validator.isEmpty(data.skills)){
        errors.skills = ' skills field is required';
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid Url';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}