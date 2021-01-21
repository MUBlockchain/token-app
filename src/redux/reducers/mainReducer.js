import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import announcementReducer from './announcementReducer';
import bountyReducer from './bountyReducer'

const mainReducer = combineReducers({
    itemReducer,
    userReducer,
    announcementReducer,
    bountyReducer
});

export default mainReducer;
