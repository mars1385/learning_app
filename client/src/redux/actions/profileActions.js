//import 
import axios from 'axios';
import {GET_PROFILE , PROFILE_LOADING , GET_ERRORS , 
  CLEAR_CURRENT_PROFILE , SET_CURRENT_USER , GET_PROFILES} from './types';


//getting current user profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles').then(res => dispatch({
    type : GET_PROFILE,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_PROFILE,
    payload : {}
  }))
}

//getting  profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profiles/handle/${handle}`).then(res => dispatch({
    type : GET_PROFILE,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_PROFILE,
    payload : null
  }))
}

//getting all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles/all').then(res => dispatch({
    type : GET_PROFILES,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_PROFILES,
    payload : null
  }))
}

//create user profile
export const createUserProfile = (profileData , history) => dispatch => {
  axios.post('/api/profiles' ,profileData).then(res => history.push('/dashboard')).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }))
}

//adding experience
export const addExperience = (userExp , history) => dispatch => {
  axios.post('/api/profiles/experience' , userExp).then(res => history.push('/dashboard')).catch(err => dispatch({
    type : GET_ERRORS ,
    payload : err.response.data
  }));
}
//adding education
export const addEducation = (userEdu , history) => dispatch => {
  axios.post('/api/profiles/education' , userEdu).then(res => history.push('/dashboard')).catch(err => dispatch({
    type : GET_ERRORS ,
    payload : err.response.data
  }));
}
//deleting experience
export const deleteExperience = (id) => dispatch => {
  axios.delete(`/api/profiles/experience/${id}`).then(res => dispatch({
    type : GET_PROFILE,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_ERRORS ,
    payload : err.response.data
  }));
}
//deleting experience
export const deleteEducation = (id) => dispatch => {
  axios.delete(`/api/profiles/education/${id}`).then(res => dispatch({
    type : GET_PROFILE,
    payload : res.data
  })).catch(err => dispatch({
    type : GET_ERRORS ,
    payload : err.response.data
  }));
} 
//Deleting user account & profile
export const deleteUserAccount = () => dispatch => {
  if(window.confirm('Are you sure ? This cant br undone')){
    axios.delete('/api/profiles').then(res => dispatch({
      type : SET_CURRENT_USER,
      payload : {}
    })).catch(err => dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));
  }
}

//loading
export const setProfileLoading = () => {
  return {
    type : PROFILE_LOADING
  }
}

//clear current profile
export const clearCurrentProfile = () => {
  return {
    type : CLEAR_CURRENT_PROFILE
  }
}