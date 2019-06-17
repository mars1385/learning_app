//include
const express = require("express");
const passport = require('passport');
//end
const router = express.Router();
//getting models
const User = require('../../models/Users');
const Profile = require('../../models/Profile');
//validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profiles
// @desc    get current user profile
// @access  private
router.get('/' , passport.authenticate('jwt' , {session : false}), (req , res) => {
  const errors = {};
  Profile.findOne({user : req.user.id})
    .populate('user' , ['name' , 'avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profiles/all
// @desc    get all profiles
// @access  public
router.get('/all' , (req , res) =>{
  const errors = {};
  Profile.find().populate('user' , ['name' , 'avatar']).then(profiles => {
    if(!profiles){
      errors.noprofile = 'There is no profiles';
      return res.status(404).json(errors);
    }
    res.json(profiles);
  }).catch(err => res.status(404).json(err));
});

// @route   GET api/profiles/handle/:handle
// @desc    get current user profile by handle
// @access  public
router.get('/handle/:handle' , (req , res) => {
  const errors = {};
  Profile.findOne({handle : req.params.handle}).populate('user' , ['name' , 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
         return res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err => res.status(404).json(err));
});

// @route   GET api/profiles/user/:user_id
// @desc    get current user profile by user id
// @access  public
router.get('/user/:user_id' , (req , res) => {
  const errors = {};
  Profile.findOne({user : req.params.user_id}).populate('user' , ['name' , 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }).catch(err => res.status(404).json(err));
});

// @route   POST api/profiles
// @desc    create or update user profile
// @access  private
router.post('/' , passport.authenticate('jwt' , {session : false}), (req , res) => {
  //validate user profile input
  const {errors , isValid} = validateProfileInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //getting all profile field
  const profileField = {};
  profileField.user = req.user.id;
  //
  if(req.body.handle) {profileField.handle = req.body.handle}
  //
  if(req.body.website) {profileField.website = req.body.website}
  //
  if(req.body.company) {profileField.company = req.body.company}
  //
  if(req.body.location) {profileField.location = req.body.location}
  //
  if(req.body.status) {profileField.status = req.body.status}
  //
  if(req.body.bio) {profileField.bio = req.body.bio}
  //
  if(req.body.githubusername) {profileField.githubusername = req.body.githubusername}
  //skills we must split
  if(typeof req.body.skills !== 'undefined') {profileField.skills = req.body.skills.split(',');}
  //socials
  profileField.social = {};
  if(req.body.youtube) {profileField.social.youtube = req.body.youtube}
  if(req.body.twitter) {profileField.social.twitter = req.body.twitter}
  if(req.body.facebook) {profileField.social.facebook = req.body.facebook}
  if(req.body.linkedin) {profileField.social.linkedin = req.body.linkedin}
  if(req.body.instagram) {profileField.social.instagram = req.body.instagram}
  //end getting profile field

  Profile.findOne({user : req.user.id}).then(profile => {
    if(profile){
      //update
      Profile.findOneAndUpdate({user : req.user.id} , {$set : profileField} , {new : true})
        .then(newProfile => {res.json(newProfile)});
    }else{
      //create new profile
      //check existing handle
      Profile.findOne({handle : profileField.handle}).then(profile => {
        if(profile) {
          errors.handle = 'That handle already exist';
          res.status(400).json(errors);
        }
        new Profile(profileField).save().then(profile => {res.json(profile)});
      });
    }
    
  });

});

// @route   POST api/profiles/experience
// @desc    add experience to user profile
// @access  private
router.post('/experience' , passport.authenticate('jwt', {session : false}) , (req , res) => {
  //validate experience input
  const {errors , isValid} = validateExperienceInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //
  Profile.findOne({user : req.user.id}).then(profile => {
    const newExp = {
      title : req.body.title ,
      company : req.body.company,
      location : req.body.location,
      from : req.body.from,
      to : req.body.to,
      current : req.body.current,
      description : req.body.description
    }
    //adding experience to user profile
    profile.experience.unshift(newExp);

    profile.save().then(profile => res.json(profile));
  })
});

// @route   POST api/profiles/Education
// @desc    add Education to user profile
// @access  private
router.post('/education' , passport.authenticate('jwt', {session : false}) , (req , res) => {
  //validate Education input
  const {errors , isValid} = validateEducationInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //
  Profile.findOne({user : req.user.id}).then(profile => {
    const newEdu = {
      school : req.body.school ,
      degree : req.body.degree,
      fieldofstudy : req.body.fieldofstudy,
      from : req.body.from,
      to : req.body.to,
      current : req.body.current,
      description : req.body.description
    }
    //adding Education to user profile
    profile.eduction.unshift(newEdu);

    profile.save().then(profile => res.json(profile));
  })
});

// @route   DELETE api/profiles/experience/:exp_id
// @desc    delete experience form user profile
// @access  private
router.delete('/experience/:exp_id' , passport.authenticate('jwt', {session : false}) , (req , res) => {
  Profile.findOne({user : req.user.id}).then(profile => {
    //getting experience index
    const removeExp = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

    //removing selected exp
    profile.experience.splice(removeExp , 1);
    profile.save().then(profile => res.json(profile));
  }).catch(err => res.status(404).json(err));
});

// @route   DELETE api/profiles/education/:edu_id
// @desc    delete Education form user profile
// @access  private
router.delete('/education/:edu_id' , passport.authenticate('jwt', {session : false}) , (req , res) => {
  Profile.findOne({user : req.user.id}).then(profile => {
    //getting Education index
    const removeEdu = profile.eduction.map(item => item.id).indexOf(req.params.exp_id);

    //removing selected exp
    profile.eduction.splice(removeEdu , 1);
    profile.save().then(profile => res.json(profile));
  }).catch(err => res.status(404).json(err));
});

// @route   DELETE api/profiles
// @desc    delete user and profile
// @access  private
router.delete('/' , passport.authenticate('jwt', {session : false}) , (req , res) => {
  Profile.findOneAndRemove({user : req.user.id}).then(() => {
    User.findOneAndRemove({_id : req.user.id}).then(() => res.json({success : true}));
  });
});
module.exports = router;
