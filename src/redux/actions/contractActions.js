import { CONTRACT_LOADING, CONTRACT_SUCCESS, CONTRACT_FAILURE } from './constants'
import { ethers } from 'ethers'

const Announcements = require('../../abi/Announcements.json')
const Bounties = require('../../abi/Bounties.json')
const Items = require('../../abi/Items.json')
const Users = require('../../abi/Users.json')

const contractLoading = () => ({
    type: CONTRACT_LOADING
})

const contractSuccess = (userContract, annoucementContract, itemContract, bountyContract) => ({
    type: CONTRACT_SUCCESS,
    userContract,
    annoucementContract,
    itemContract,
    bountyContract
})

const contractFailure = () => ({
    type: CONTRACT_FAILURE
})

export const createContract = privateKey => async dispatch => {
    dispatch(contractLoading())

    if (!privateKey) dispatch(contractFailure())

    const provider = ethers.getDefaultProvider('kovan')
    const wallet = new ethers.Wallet(`0x${privateKey}`, provider)
    
    // Connect to the contract instance and return so that it is accessible throughout app
    const userContract = new ethers.Contract('0xD2d045e42603182f236f0c7cfD33bb7D743E2dcc', Users, wallet)
    const announcementContract = new ethers.Contract('0x606232693ee7904044010Fe3D24e509d24b2696E', Announcements, wallet)
    const itemContract = new ethers.Contract('0xDc8e83240f8271769119B56A85B0e788a43A3a25', Items, wallet)
    const bountyContract = new ethers.Contract('0x54D663193FEf614F7B5d1F9288c3Dd2F5aE23461', Bounties, wallet)

    //@dev
    let role = await userContract.role(wallet.address)
    
    if (role.toNumber() == 0)
        await userContract.enroll('Peter', 'petercooke5361', 'imageUrl')

    dispatch(contractSuccess(
        userContract,
        announcementContract,
        itemContract,
        bountyContract
    ))
}