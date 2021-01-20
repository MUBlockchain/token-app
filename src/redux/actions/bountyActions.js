import { 
    BOUNTY_SUCCESS,
    BOUNTY_FAILURE,
    BOUNTY_LOADING,
    BOUNTY_TIMEOUT
} from './constants';

import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers'

const Bounties = require('../../abi/Bounties.json')

const bountiesLoading = () => ({
    type: BOUNTY_LOADING
})

const bountiesSuccess = (pItems, npItems, allItems) => ({
    type: BOUNTY_SUCCESS,
    pItems,
    npItems,
    allItems
})

const bountiesFailure = () => ({
    type: BOUNTY_FAILURE
})

const bountiesTimeout = () => ({
    type : BOUNTY_TIMEOUT
})


export const getBounties = (wallet, purchased) => async (dispatch) => {
    dispatch(bountiesLoading());

    try {
        /* =====  Bounty getBounty ==== */
        //const bountyContract = new ethers.Contract(Bounties.networks[42].address, Bounties.abi, wallet)
        //const bounties = await bountyContract.getItems();

        /* ===== Dummy Bounty getBounty Response ==== */
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

        var pBounties = [];
        var npBounties = [];
        var allBounties = [];

        for (index = 0; index < bounties._titles.length; index++) {
            var obj = {
                title: bounties._titles[index],
                description: bounties._descriptions[index],
                imageUrl: bounties._imageUrls[index],
                cost: bounties._awards[index],
                infinite: bounties._infinites[index],
                quantity: bounties._quantities[index],
                active: bounties._actives[index]
            }
            
            if (purchased.includes(index)) {
                pBounties.push(obj)
            } else {
                npBounties.push(obj)
            }

            allBounties.push(obj)
        }

        console.log("itemActions: ", allBounties)

        dispatch(bountiesSuccess(pBounties, npBounties, allBounties));
    } catch (e) {
        console.log(e)
    }
}