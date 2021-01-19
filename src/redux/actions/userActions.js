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

const userSuccess = (privateKey, publicAddress, wallet, email, name, profileImage, items, bounties) => ({
    type: USER_SUCCESS,
    privateKey,
    publicAddress,
    wallet,
    email,
    name,
    profileImage,
    items,
    bounties
})

const userFailure = (error) => ({
    type: USER_FAILURE,
    error
})

const userTimeout = () => ({
    type : USER_TIMEOUT
})

export const saveUserInformation = (privateKey, publicAddress, wallet, email, name, profileImage) => (dispatch) => {
    dispatch(userLoading())
    
    try {
         /* =====  User getUser ==== */
        //const userContract = new ethers.Contract('0xD2d045e42603182f236f0c7cfD33bb7D743E2dcc', Users, wallet)
        //const user = await userContract.getUser(publicAddress);

        /* ===== Dummy User getUser Response ==== */
        const user = {
            "name": name,
            "twitterId": "twitterId",
            "imageUrl": "imageUrl",
            "address": "address",
            "balance": "balance",
            "items": [ 1 ],
            "bounties": [ 1 ]
        }


        /* console.log('FLAG 3')
        //@dev
        const role = await userContract.role(wallet.address)

        console.log('FLAG 4 ROLE: ', role)
        if (role.toNumber() == 0)
            await userContract.enroll('Peter', 'petercooke5361', 'imageUrl')

        console.log('FLAG 5')
        */

        dispatch(userSuccess(privateKey, publicAddress, wallet, email, name, profileImage, user.items, user.bounties));
    } catch (e) {
        console.log(e)
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
