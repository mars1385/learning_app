//include
const validator = require('validator');
const isEmpty = require('./isEmpty');
//end

module.exports = function validateEducationInput (data) {
  let errors = {}
  //if field are empty making them string
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  //
  if(validator.isEmpty(data.school)){
    errors.school = 'School field is required';
  }
  //
  if(validator.isEmpty(data.degree)){
    errors.degree = 'Degree field is required';
  }
  //
  if(validator.isEmpty(data.from)){
    errors.from = 'From date field is required';
  }
   //
   if(validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = 'FieldOfStudy date field is required';
  }
  return {
    errors,
    isValid : isEmpty(errors)
  }
}