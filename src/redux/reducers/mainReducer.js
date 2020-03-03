import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

const mainReducer = combineReducers({
    itemReducer,
    userReducer
});

export default mainReducer;
