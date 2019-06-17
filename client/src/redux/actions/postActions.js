//
import axios from 'axios'
import {ADD_POST , GET_ERRORS , GET_POSTS , POST_LOADING,
   DELETE_POST , GET_POST ,CLEAR_ERRORS } from './types';

//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/post' , postData).then(res => dispatch({
    type : ADD_POST,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}

//get posts
export const getPost = () => dispatch => {

  dispatch(setPostLoading());

  axios.get('/api/post').then(res => dispatch({
    type : GET_POSTS,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_POSTS,
    payload : null
  }))
}
//get post
export const getClickedPost = (id) => dispatch => {
  console.log(id);
  dispatch(setPostLoading());
  axios
    .get(`/api/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
}

//delete post
export const deletePost = postId => dispatch => {
  axios.delete(`/api/post/${postId}`).then(res => dispatch({
    type : DELETE_POST,
    payload : postId
  })).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}

//add like
export const addLike = postId => dispatch => {
  axios.post(`/api/post/like/${postId}`).then(res => dispatch(getPost())).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}
//remove like
export const removeLike = postId => dispatch => {
  axios.post(`/api/post/unlike/${postId}`).then(res => dispatch(getPost())).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}

//add comment
export const addComment = (postId , commentData) => dispatch => {
  dispatch(clearErrors());
  axios.post(`/api/post/comment/${postId}` , commentData).then(res => dispatch({
    type : GET_POST,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}
//delete comment
export const deleteComment = (postId , commentId) => dispatch => {
  axios.delete(`/api/post/comment/${postId}/${commentId}`).then(res => dispatch({
    type : GET_POST,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}

//loading
export const setPostLoading = () =>{
  return {
    type : POST_LOADING
  }
}
//clear error
export const clearErrors = () =>{
  return {
    type : CLEAR_ERRORS
  }
}
