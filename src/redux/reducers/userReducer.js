import { USER_FAILURE, USER_SUCCESS, USER_LOADING, USER_TIMEOUT } from '../actions/constants';

const initState = {
    uniqueID: "",
    name: "",
    uuid: -1,
    balance: 0,
    purchases: [],
    profilePic: 'https://lh3.googleusercontent.com/-bDdZL2tOyTI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclbHP9e-0lGGlWhg7K89k3ntLDwXA/s96-c/photo.jpg',
    isLoading: false,
    token: ""
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
                profilePic: action.profilePic,
                isLoading: false,
                token: action.token
            };
        case USER_FAILURE:
            return {
                ...state,
                uniqueID: "",
                name: "",
                uuid: -1,
                balance: 0,
                purchases: [],
                profilePic: 'https://lh3.googleusercontent.com/-bDdZL2tOyTI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclbHP9e-0lGGlWhg7K89k3ntLDwXA/s96-c/photo.jpg',
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
                profilePic: 'https://lh3.googleusercontent.com/-bDdZL2tOyTI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclbHP9e-0lGGlWhg7K89k3ntLDwXA/s96-c/photo.jpg',
                isLoading: false
            };
        default:
            return state;
    }
}


export default userReducer;
