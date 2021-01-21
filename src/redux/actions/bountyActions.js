import { 
    BOUNTY_SUCCESS,
    BOUNTY_FAILURE,
    BOUNTY_LOADING,
    BOUNTY_TIMEOUT,
    BOUNTY_SELECT,
    BOUNTY_APPLYING
} from './constants';

import "@ethersproject/shims"
import { ethers } from 'ethers'

const Bounties = require('../../abi/Bounties.json')

const bountiesLoading = () => ({
    type: BOUNTY_LOADING
})

const bountiesSuccess = (availableBounties, pendingBounties, awardedBounties, allBounties, bountyContract) => ({
    type: BOUNTY_SUCCESS,
    availableBounties,
    pendingBounties,
    awardedBounties,
    allBounties,
    bountyContract
})

const bountiesFailure = () => ({
    type: BOUNTY_FAILURE
})

const bountiesTimeout = () => ({
    type : BOUNTY_TIMEOUT
})

const bountiesApplying = () => ({
    type : BOUNTY_APPLYING
})

const bountiesApplied = () => ({
    type : BOUNTY_APPLYING
})

const selectBountyHelper = (bountyIndex) => ({
    type: BOUNTY_SELECT,
    bountyIndex
});

export const applyForBounty = (index, bountyContract) => async (dispatch) => {
    dispatch(bountiesApplying())
    console.log('FLAG Apply for Bounty Index', index)
    console.log('FLAG Apply for Bounty', bountyContract)
    const bounty = await bountyContract.applyForBounty(index);
    
    dispatch(bountiesApplied())
}

export const selectBounty = (bountyIndex) => (dispatch) => {
    console.log('Select Bounty: ' + bountyIndex);
    dispatch(selectBountyHelper(bountyIndex))
}

export const getBounties = (wallet, userBounties) => async (dispatch) => {
    dispatch(bountiesLoading());

    try {
        /* =====  Bounty getBounty ==== */
        console.log('BOUNTY FLAG 1')
        const bountyContract = new ethers.Contract(Bounties.networks[42].address, Bounties.abi, wallet)
        
        const bounties = await bountyContract.getBounties();
        const pending1 = await bountyContract.pendingBountyRequests(1);
        const pending2 = await bountyContract.pendingBountyRequests(2);

        //console.log('bounties: ', bounties)
        //console.log('pending1: ', JSON.stringify(pending1))
        //console.log('pending2: ', pending2)

        /* ===== Dummy Bounty getBounty Response ==== */
        /*
        const bounties = {
            "_bountyNonce": "bountyNonce",
            "_titles": [
                'Bounty 1',
                'Bounty 2'
            ],
            "_descriptions": [
                'Bounty 1 Description',
                'Bounty 2 Description'
            ],
            "_imageUrls": [
                'Bounty 1 imageUrl',
                'Bounty 2 imageUrl'
            ],
            "_awards": [
                'Bounty 1 Award',
                'Bounty 2 Award'
            ],
            "_infinites": [
                'Bounty 1',
                'Bounty 2'
            ],
            "_quantities": [
                'Bounty 1 Quantity',
                'Bounty 2 Quantity'
            ],
            "_actives": [
                'true',
                'true'
            ]
        }
        */

        
        var pendingBounties = [];
        var awardedBounties = [];
        var availableBounties = []
        var allBounties = [];

        // ===== Filter Pending1 Bounties =====
        for (index = 0; index < pending1[0].toNumber(); index++) {
            var obj = {
                address: pending1[1][index],
                userName: pending1[2][index],
                bounties: pending1[3][index],
                bountyName: pending1[4][index],
                awards: pending1[5][index].toNumber(),
                quantity: pending1[6][index].toNumber(),
                infinite: pending1[7][index]
            }
            
            pendingBounties.push(obj)
        }

        // ===== Filter Pending2 Bounties =====
        for (index = 0; index < pending2[0].toNumber(); index++) {
            var obj = {
                address: pending2[1][index],
                userName: pending2[2][index],
                bounties: pending2[3][index],
                bountyName: pending2[4][index],
                awards: pending2[5][index].toNumber(),
                quantity: pending2[6][index].toNumber(),
                infinite: pending2[7][index]
            }
            
            pendingBounties.push(obj)
        }

        // ===== Filter Awarded and Available Bounties =====
        for (index = 0; index < bounties[0].toNumber(); index++) {
            let isAwarded;
            
            if (userBounties === undefined) {
                isAwarded = false
            } else {
                isAwarded = userBounties.includes(index)
            }
            
            var obj = {
                title: bounties[1][index],
                description: bounties[2][index],
                imageUrl: bounties[3][index],
                awards: bounties[4][index].toNumber(),
                infinite: bounties[5][index],
                quantity: bounties[6][index].toNumber(),
                active: bounties[7][index],
                isAwarded: isAwarded,
                bountyIndex: index
            }
            
            if (isAwarded) {
                awardedBounties.push(obj)
            } else {
                availableBounties.push(obj)
            }

            allBounties.push(obj)
        }

        //console.log("bountyActions: ", allBounties)
        

        dispatch(bountiesSuccess(availableBounties, pendingBounties, awardedBounties, allBounties, bountyContract));
    } catch (e) {
        console.log(e)
    }
}