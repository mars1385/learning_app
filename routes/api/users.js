//include
const express = require("express");
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
//end
const router = express.Router();
//getting models
const User = require('../../models/Users');
//validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route   POST api/users/register
// @desc    register new user
// @access  public
router.post('/register' , (req , res) => {
  const {email , name , password} = req.body;
  //check validation for input
  const {errors , isValid} = validateRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //checking if user exist ?
  User.findOne({email : email})
    .then(user => {
      if(user) {
        errors.email = 'email is already exist';
        return res.status(400).json(errors)
      }

      //creating new user
      const avatar = gravatar.url(email , {
        s : '200', //size
        r : 'pg', // rating
        d : 'mm' //default
      })
      const newUser = new User ({name , email , password , avatar });
      //hashing password
      bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password , salt , (err , hash) =>{
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      })

    })
});//end

// @route   POST api/users/user
// @desc    login user
// @access  public
router.post('/login' , (req , res) => {
  const {email , password} = req.body;

  //check validation for input
  const {errors , isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email})
    .then(user => {
      //checking if user exist ?
      if(!user) {
        errors.email = 'user dose not exist';
        return res.status(404).json(errors)
      }
      //checking password
      bcrypt.compare(password , user.password)
        .then(isMatch => {
          //password is match ?
          if(!isMatch) {
            errors.password = 'password is incorrect';
            return res.status(400).json(errors)
          }

          //user match
          const payload = {id : user.id , name : user.name , avatar : user.avatar}
          //login token
          jwt.sign(payload , keys.secretOrKey , {expiresIn : 3600} , (err , token) => {
            res.json({
              success : true,
              token : 'Bearer ' + token
            })
          })
        })
    })
});//end

// @route   GET api/users/current
// @desc    getting current user
// @access  private
router.get('/current' , passport.authenticate('jwt', {session : false}) , (req , res) =>{
  res.json(req.user);
});//end

module.exports = router;
