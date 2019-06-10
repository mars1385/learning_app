//includes
const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
//end
const router = express.Router();
//getting models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
//getting validation
const validatePostInput = require('../../validation/post'); 

// @route   GET api/post
// @desc    see all posts
// @access  Public
router.get('/' , (req , res) => {
  Post.find().sort({ date : -1}) .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPostsFind : 'no post find by that id'}));
});//end

// @route   GET api/post/:id
// @desc    see all post by id
// @access  Public
router.get('/:id' , (req , res) => {
  Post.findById(req.params.id).then(post => res.json(post))
    .catch(err => res.status(404).json({noPostFind : 'no post find by that id'}));
});//end

// @route   POST api/post
// @desc    create new post
// @access  Private
router.post('/' , passport.authenticate('jwt' , {session : false}) , (req , res) => {

  //check validation for input
  const {errors , isValid} = validatePostInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  //creating new post
  const newPost = new Post ({
    user : req.user.id,
    text : req.body.text,
    name : req.body.name,
    avatar : req.body.avatar
  });
  newPost.save().then(post => res.json(post));
});//end

// @route   DELETE api/post/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) => {
  Post.findById(req.params.id).then(post => {
    //check post owner
    if(post.user.toString() !== req.user.id) {
      return res.status(401).json({notAuthorized : 'User not authorized'});
    }
    //removing the post
    post.remove().then(() => res.json({success : true}));
  }).catch(err => res.status(404).json({postNotFind : 'Post not find'}));
});//end

// @route   Post api/post/like/:id
// @desc    Like a post
// @access  Private
router.post('/like/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) => {
  Post.findById(req.params.id).then(post => {
    //check to see user already like this post
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({alreadyLiked : 'User already like this post'});
    }
    //like the post
    post.likes.unshift({user : req.user.id});
    post.save().then(post => res.json(post));
  }).catch(err => res.status(404).json({postNotFind : 'Post not find'}));
});//end

// @route   Post api/post/unlike/:id
// @desc    unLike a post
// @access  Private
router.post('/unlike/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) => {
  Post.findById(req.params.id).then(post => {
    //check to see user already like this post
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({notLiked : 'User not liked this post'});
    }
    //unlike the post
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex , 1);
    post.save().then(post => res.json(post));
  }).catch(err => res.status(404).json({postNotFind : 'Post not find'}));
});//end

// @route   Post api/post/comment/:id
// @desc    Adding comment to post
// @access  Private
router.post('/comment/:id' , passport.authenticate('jwt' , {session : false}) , (req , res) => {

  //check validation for input
  const {errors , isValid} = validatePostInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id).then(post => {
    const newComment = {
      user : req.user.id,
      text : req.body.text,
      name : req.body.name,
      avatar : req.body.avatar
    }
    post.comments.unshift(newComment);
    post.save().then(post => res.json(post));
  }).catch(err => res.status(404).json({postNotFind : 'Post not find'}));
});

// @route   DELETE api/post/comment/:id/comment_id
// @desc    Deleting comment in post
// @access  Private
router.delete('/comment/:id/:comment_id' , passport.authenticate('jwt' , {session : false}) , (req , res) => {

  Post.findById(req.params.id).then(post => {
    //checking to see if comment exist?
    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
      return res.status(400).json({noComment : 'Comment dose not exist'});
    }
    console.log(1);
    //finding and removing user comment
    const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex , 1);
    post.save().then(post => res.json(post));

  }).catch(err => res.status(404).json({postNotFind : 'Post not find'}));
});

module.exports = router;
