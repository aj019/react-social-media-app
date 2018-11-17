import axios from 'axios'

import {ADD_POST, GET_ERRORS, GET_POSTS,POST_LOADING, DELETE_POST,GET_POST,CLEAR_ERRORS} from './types'

export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
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

//Get Posts
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

//Get Post
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/api/post/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
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

//Add Like 

export const addLike = (postId) => dispatch => {
    axios
        .post(`/api/post/like/${postId}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Add UnLike 

export const removeLike = (postId) => dispatch => {
    axios
        .post(`/api/post/unlike/${postId}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Add Comment
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/post/comment/${postId}`,commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

//Delete Comment
export const deleteComment = (postId,commentId) => dispatch => {
    axios
        .delete(`/api/post/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
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

//Clear Erros
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
}