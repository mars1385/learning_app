//include
const validator = require('validator');
const isEmpty = require('./isEmpty');
//end

module.exports = function validateLoginInput (data) {
  let errors = {}
  //if field are empty making them string
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  //
  if(!validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }
  //
  if(validator.isEmpty(data.email)){
    errors.email = 'Email field is required';
  }
  //
  if(validator.isEmpty(data.password)){
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}