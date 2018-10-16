import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorsreducer from './errorsReducer';

export default combineReducers({
    auth : authReducer,
    errors: errorsreducer
});