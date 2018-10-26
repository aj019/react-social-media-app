import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorsreducer from './errorsReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth : authReducer,
    errors: errorsreducer,
    profile: profileReducer
});