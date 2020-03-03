import { USER_FAILURE, USER_SUCCESS, USER_LOADING, USER_TIMEOUT } from '../actions/constants';

const initState = {
    uniqueID: "",
    name: "",
    uuid: -1,
    balance: 0,
    purchases: [],
    isLoading: false
};
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_SUCCESS:
            return {
                ...state,
                uniqueID: action.data.uniqueID,
                name: action.data.name,
                uuid: action.data.uuid,
                balance: action.data.balance,
                purchases: action.data.purchases,
                isLoading: false
            };
        case USER_FAILURE:
            return {
                ...state,
                uniqueID: "",
                name: "",
                uuid: -1,
                balance: 0,
                purchases: [],
                isLoading: false
            };
        case USER_TIMEOUT:
            return {
                ...state,
                uniqueID: "",
                name: "",
                uuid: -1,
                balance: 0,
                purchases: [],
                isLoading: false
            };
        default:
            return state;
    }
}


export default userReducer;
