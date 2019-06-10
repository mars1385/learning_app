//include
const validator = require('validator');
const isEmpty = require('./isEmpty');
//end

module.exports = function validatePostInput (data) {
  let errors = {}
  //if field are empty making them string
  data.text = !isEmpty(data.text) ? data.text : '';
  //
  if(!validator.isLength(data.text , {min : 10 , max : 300})){
    errors.text = 'Psot must be between 10 and 300 characters';
  }
  //
  if(validator.isEmpty(data.text)){
    errors.text = 'Text field is required';
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}