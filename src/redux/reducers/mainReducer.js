import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const mainReducer = combineReducers({
    itemReducer
});

export default mainReducer;
