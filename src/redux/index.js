import mainReducer from './reducers/mainReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


export default function configureStore() {
    var store = createStore(
        mainReducer,
        applyMiddleware(thunk)
    );

    return store;
}
