import { 
    USER_LOADING, 
    USER_SUCCESS, 
    USER_FAILURE, 
    USER_TIMEOUT
} from './constants';
import "@ethersproject/shims/dist/index.js"
import { ethers } from 'ethers'

const Users = require('../../abi/Users.json');

const userLoading = () => ({
    type: USER_LOADING
})

const userSuccess = (privateKey, publicAddress, wallet, email, name, profileImage, items, bounties, registerUser, userContract) => ({
    type: USER_SUCCESS,
    privateKey,
    publicAddress,
    wallet,
    email,
    name,
    profileImage,
    items,
    bounties,
    registerUser,
    userContract
})

const userFailure = (error) => ({
    type: USER_FAILURE,
    error
})

const userTimeout = () => ({
    type : USER_TIMEOUT
})

export const saveUserInformation = (privateKey, publicAddress, wallet, email, name, profileImage) => async (dispatch) => {
    dispatch(userLoading())
    
    try {
         /* =====  User getUser ==== */
        const userContract = new ethers.Contract(Users.networks[42].address, Users.abi, wallet)
        const user = await userContract.getUser(publicAddress);

        /* ===== Dummy User getUser Response ==== */
        /*
        const user = {
            "name": name,
            "twitterId": "twitterId",
            "imageUrl": "imageUrl",
            "address": "address",
            "balance": "balance",
            "items": [ 1 ],
            "bounties": [ 1 ]
        }
        */

        let exists = await userContract.role(publicAddress)
        exists = exists.toNumber()
        
        let registerUser = false;
        if (!exists) {
            registerUser = true;
        }

        dispatch(userSuccess(privateKey, publicAddress, wallet, email, name, profileImage, user.items, user.bounties, registerUser, userContract));
    } catch (e) {
        console.log('userAction Error: ', e)
    }
}

export const createUserContract = wallet => async dispatch => {
    dispatch(userLoading())

    try {

        const userContract = new ethers.Contract('0xD2d045e42603182f236f0c7cfD33bb7D743E2dcc', Users, wallet)
        dispatch(userSuccess)
    } catch (e) {
        console.log(e)
    }
}

export const doesUserExist = publicAddress => async dispatch => {

}
