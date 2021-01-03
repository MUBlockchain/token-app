import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import announcementReducer from './announcementReducer';
import contractReducer from './contractReducer';

const mainReducer = combineReducers({
    itemReducer,
    userReducer,
    announcementReducer,
    contractReducer
});

export default mainReducer;
