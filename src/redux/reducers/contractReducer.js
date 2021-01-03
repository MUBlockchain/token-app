import {CONTRACT_LOADING, CONTRACT_SUCCESS, CONTRACT_FAILURE} from '../actions/constants';

const initContractState = {
    isLoading: false,
    errorBack: false,
    contract: null
};

const contractReducer = (state = initContractState, action) => {
    switch(action.type) {
        case CONTRACT_LOADING:
            return {
            ...state,
            isLoading: true,
            errorBack: false,
            contract: null
            };
        case CONTRACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                contract: action.contract
            };
        case CONTRACT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorBack: true,
                contract: null
            };
        default: 
            return state;
    }
}

export default contractReducer