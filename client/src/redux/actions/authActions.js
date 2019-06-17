//import
import {GET_ERRORS , SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//register new user
export const registerUser = (userData , history) => dispatch => {
  axios.post('/api/users/register' , userData).then(response => history.push('/login')).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }));
}


//login as user
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login' , userData).then(res => {
    //taking jwt token
    const {token} = res.data;
    //saving in localStorage
    localStorage.setItem('jwtToken' , token);
    //set token to all auth req
    setAuthToken(token);
    //decoding jwt token
    const decode = jwt_decode(token);
    //dispatching user info
    dispatch(setCurrentUser(decode));
  }).catch(err => dispatch({
    type : GET_ERRORS,
    payload : err.response.data
  }));
}

//set logged user
export const setCurrentUser = decoded => {
  return{
    type : SET_CURRENT_USER,
    payload : decoded
  }
}

//logout user
export const logoutUser = () => dispatch => {
  //remove jwt token from localStorage
  localStorage.removeItem('jwtToken');
  //remove auth header
  setAuthToken(false);
  //remove current user info
  dispatch(setCurrentUser({}));
}