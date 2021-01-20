import { CONTRACT_LOADING, CONTRACT_SUCCESS, CONTRACT_FAILURE } from '../actions/constants';

const initContractState = {
    isLoading: false,
    errorBack: false,
    userContract: null,
    annoucementContract: null,
    itemContract: null,
    bountyContract: null,
};

const contractReducer = (state = initContractState, action) => {
    switch (action.type) {
        case CONTRACT_LOADING:
            return {
                ...state,
                isLoading: true,
                errorBack: false,
                userContract: null,
                annoucementContract: null,
                itemContract: null,
                bountyContract: null,
            };
        case CONTRACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userContract: action.userContract,
                annoucementContract: action.annoucementContract,
                itemContract: action.itemContract,
                bountyContract: action.bountyContract,
            };
        case CONTRACT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorBack: true,
                contract: null,
                userContract: null,
                annoucementContract: null,
                itemContract: null,
                bountyContract: null,
            };
        default:
            return state;
    }
}

export default contractReducer