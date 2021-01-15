
import { BOUNTY_LOADING, BOUNTY_SUCCESS, BOUNTY_FAILURE, BOUNTY_TIMEOUT, BOUNTY_SELECT } from '../actions/constants';

const initBountyState = {
    isLoading: false,
    pBounties: [],
    npBounties: [],
    bounties: [],
    errorBack: false,
    error: '',
    placeholder: 'There are currenlty no bounties for you to purchase!',
    timeoutOccurred: false,
    selectedItem: ''
}


const bountyReducer = (state = initBountyState, action) => {
    switch (action.type) {
        case BOUNTY_LOADING:
            return {
                ...state,
                isLoading: true,
                errorBack: false,
                placeHolder: 'There are currently no bounties for you to purchase!',
                timeoutOccurred: false
            };
        case BOUNTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorBack: false,
                timeoutOccurred: false,
                pItems: action.pItems,
                npItems: action.npItems,
                items: action.allItems
            };
        case BOUNTY_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorBack: true,
                timeoutOccurred: false,
                error: 'Error while fetching bounties'
            };
        case BOUNTY_TIMEOUT:
            return {
                ...state,
                isLoading: false,
                timeoutOccurred: true,
                errorBack: true,
                error: 'Connection Timeout to API'
            };
        default:
            return state;
    }
}

export default bountyReducer;