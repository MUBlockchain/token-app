
import { ITEMS_LOADING, ITEMS_SUCCESS, ITEMS_FAILURE, ITEMS_TIMEOUT, ITEMS_SELECT } from '../actions/constants';

const initItemsState = {
    isLoading: false,
    pItems: [],
    npItems: [],
    items: [],
    errorBack: false,
    error: '',
    placeholder: 'There are currenlty no items for you to purchase!',
    timeoutOccurred: false,
    selectedItem: '',
    itemContract: ''
}


const itemReducer = (state = initItemsState, action) => {
    switch (action.type) {
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true,
                errorBack: false,
                placeHolder: 'There are currently no items for you to purchase!',
                timeoutOccurred: false
            };
        case ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorBack: false,
                timeoutOccurred: false,
                pItems: action.pItems,
                npItems: action.npItems,
                items: action.allItems,
                itemContract: action.itemContract
            };
        case ITEMS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorBack: true,
                timeoutOccurred: false,
                error: 'Error while fetching Items'
            };
        case ITEMS_TIMEOUT:
            return {
                ...state,
                isLoading: false,
                timeoutOccurred: true,
                errorBack: true,
                error: 'Connection Timeout to API'
            };
        case ITEMS_SELECT:
            return { 
                ...state,
                selectedItem: action.itemIndex 
            };
        default:
            return state;
    }
}

export default itemReducer;