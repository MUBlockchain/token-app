import {CONTRACT_LOADING, CONTRACT_SUCCESS, CONTRACT_FAILURE} from './constants'
import { ethers } from 'ethers'
const Announcements = require('../../abi/Announcements.json')

const contractLoading = () =>  ({
    type: CONTRACT_LOADING
})

const contractSuccess = contract => ({
    type: CONTRACT_SUCCESS,
    contract
})

const contractFailure = () => ({
    type: CONTRACT_FAILURE
})

export const createContract = privateKey => dispatch => {
        dispatch(contractLoading())
        if(!privateKey) dispatch(contractFailure())
        const provider = ethers.getDefaultProvider('rinkeby')
        const wallet = new ethers.Wallet(`0x${privateKey}`, provider)
        // Determine Ethereum network to connect to
        const chainId = wallet.provider._network.chainId

        // Connect to deployed contract, if it exists
        const address = Announcements.networks[chainId].address
        
        // Connect to the contract instance and return so that it is accessible throughout app
        dispatch(contractSuccess(new ethers.Contract(address, Announcements.abi, wallet)))
}