import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import announcementReducer from './announcementReducer';
import contractReducer from './contractReducer';
import bountyReducer from './bountyReducer'

const mainReducer = combineReducers({
    itemReducer,
    userReducer,
    announcementReducer,
    contractReducer,
    bountyReducer
});

export default mainReducer;
