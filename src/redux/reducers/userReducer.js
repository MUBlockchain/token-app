import { act } from 'react-test-renderer';
import { USER_FAILURE, USER_SUCCESS, USER_LOADING, USER_TIMEOUT } from '../actions/constants';

const initState = {
    privateKey: '',
    publicAddress: '',
    wallet: '',
    email: '',
    name: '',
    uuid: -1,
    balance: 0,
    purchases: [],
    profilePic: 'https://lh3.googleusercontent.com/-bDdZL2tOyTI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclbHP9e-0lGGlWhg7K89k3ntLDwXA/s96-c/photo.jpg',
    isLoading: false,
    token: ''
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
                privateKey: action.privateKey,
                publicAddress: action.publicAddress,
                wallet: action.wallet,
                email: action.email,
                name: action.name,
                profilePic: action.profileImage,
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
