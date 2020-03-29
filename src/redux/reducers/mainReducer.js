import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import announcementReducer from './announcementReducer';

const mainReducer = combineReducers({
    itemReducer,
    userReducer,
    announcementReducer
});

export default mainReducer;
