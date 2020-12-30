import { 
    USER_LOADING, 
    USER_SUCCESS, 
    USER_FAILURE, 
    USER_TIMEOUT
} from './constants';
import QueryHandler from '../../api/QueryHandler';
import {ethers as Ethers } from 'ethers'
import configureStore from '../index'

const Announcements = require('../../abi/Announcements.json');

const userLoading = () => ({
    type: USER_LOADING
})

const userSuccess = (privateKey, publicAddress, wallet, email, name, profileImage) => ({
    type: USER_SUCCESS,
    privateKey,
    publicAddress,
    wallet,
    email,
    name,
    profileImage
})

const userFailure = (error) => ({
    type: USER_FAILURE,
    error
})

const userTimeout = () => ({
    type : USER_TIMEOUT
})

export const useContract = (wallet) => {
    const { user, ethers } = useContext(UserContext)
    if(!user || !ethers) return null

    // Determine Ethereum network to connect to
    const chainId = ethers.provider._network.chainId
    // Connect to deployed contract, if it exists
    const address = Announcements.networks[chainId].address
    // Connect to the contract instance and return so that it is accessible throughout app
    return new wallet.Contract(address, Announcements.abi, ethers)
}

export const saveUserInformation = (privateKey, publicAddress, wallet, email, name, profileImage) => (dispatch) => {
    dispatch(userSuccess(privateKey, publicAddress, wallet, email, name, profileImage));
}

export const getUserProfile = (uuid, token, profilePic) => async (dispatch) => {
    dispatch(userLoading());

    //Do api call
    var res = await QueryHandler.getUserProfile(uuid, token);
    console.log("User Profile: " + JSON.stringify(res.data));

    if (!res) {
        console.log("UserFailure...");
        dispatch(userFailure(res.status));
    } else if (res['status'] === 200) {
        console.log("UserSuccess... Token: "+ profilePic);
        dispatch(userSuccess(res.data, token, profilePic));
    } else {
        console.log("UserTimeout...");
        dispatch(userTimeout());
    }
}