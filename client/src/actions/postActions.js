import axios from 'axios'

import {ADD_POST, GET_ERRORS, GET_POSTS,POST_LOADING, DELETE_POST} from './types'

export const addPost = (postData) => dispatch => {
    axios
        .post('/api/post',postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/api/post')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

//Delete Post

export const deletePost = (postId) => dispatch => {
    axios
        .delete(`/api/post/${postId}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: postId
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Set Loading State
export const setPostLoading = () => {
    return{
        type: POST_LOADING
    }
}