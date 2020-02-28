
import { ITEMS_LOADING, ITEMS_SUCCESS, ITEMS_FAILURE, ITEMS_TIMEOUT } from '../actions/constants';

const initItemsState = {
    isLoading: false,
    items: [],
    errorBack: false,
    errorMsg: null,
    placeholder: 'There are currenlty no items for you to purchase!',
    timeoutOccurred: false
}


const itemReducer = (state = initItemsState, action) => {
    switch (action.type) {
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
                errorBack: false,
                errorMsg: null,
                placeHolder: 'There are currently no items for you to purchase!',
                timeoutOccurred: false
            };
        case ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.data
            };
        case ITEMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: 'Error while fetching Items'
            };
        case ITEMS_TIMEOUT:
            return {
                ...state,
                isLoading: false,
                error: 'Connection Timeout to API'
            };    
        default:
            return state;
    }
}

export default itemReducer;