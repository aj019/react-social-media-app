import axios from 'axios';
import {GET_PROFILE,PROFILE_LOADING,GET_ERRORS, CLEAR_CURRENT_PROFILE} from './types'


//Get Current Profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios
    .get('/api/profile')
    .then(res => 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
    .catch(err => dispatch({
        type: GET_PROFILE,
        payload: {}
    }))
}

// Set profile Loading
export const setProfileLoading = () =>{
    return {
        type: PROFILE_LOADING
    }
}

// Clear Profile
export const clearCurrentProfile = () =>{
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}