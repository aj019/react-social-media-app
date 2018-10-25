import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

//Register User
export const registerUser = (userdata,history) => dispatch => {
    
     axios.post('/api/users/register',userdata)
          .then(res => history.push('/login'))
          .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
                 
          }))
}

//Login User - get user token

export const loginUser = (userdata) => dispatch => {

    axios.post('api/users/login',userdata)
         .then(res => {
            const {token} = res.data
            //Set token to local storage
            localStorage.setItem('jwtToken',token)
            //Set Token to Auth Header
            setAuthToken(token)
            //Decode JWT token
            const decoded = jwt_decode(token)
            //Set Current User
            dispatch(setCurrentUser(decoded))
         })
         .catch(err => dispatch({
             type: GET_ERRORS,
             payload: err.response.data
         }))   
}

//Set Logged in User 
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log User Out 

export const logoutUser = () => dispatch => {
    //Remove the token from localStrorage
    localStorage.removeItem('jwtToken');
    // Remove Auth Header
    setAuthToken(false);
    //Set Current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}

