import { 
    USER_LOADING, 
    USER_SUCCESS, 
    USER_FAILURE, 
    USER_TIMEOUT
} from './constants';
import QueryHandler from '../../api/QueryHandler';

const userLoading = () => ({
    type: USER_LOADING
})

const userSuccess = (data) => ({
    type: USER_SUCCESS,
    data
})

const userFailure = (error) => ({
    type: USER_FAILURE,
    error
})

const userTimeout = () => ({
    type : USER_TIMEOUT
})

export const getUserProfile = (uuid) => async (dispatch) => {
    dispatch(userLoading());

    //Do api call
    var res = await QueryHandler.getUserProfile(uuid);
    console.log("User Profile: " + JSON.stringify(res.data));

    if (!res) {
        console.log("UserFailure...");
        dispatch(userFailure(res.status));
    } else if (res['status'] === 200) {
        console.log("UserSuccess...");
        dispatch(userSuccess(res.data));
    } else {
        console.log("UserTimeout...");
        dispatch(userTimeout());
    }
}