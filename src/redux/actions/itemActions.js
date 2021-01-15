import { 
    ITEMS_LOADING, 
    ITEMS_SUCCESS, 
    ITEMS_FAILURE, 
    ITEMS_TIMEOUT,
    ITEMS_SELECT
} from './constants';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers'

const Items = require('../../abi/Items.json')

const itemsLoading = () => ({
    type: ITEMS_LOADING
})

const itemsSuccess = (pItems, npItems, allItems) => ({
    type: ITEMS_SUCCESS,
    pItems,
    npItems,
    allItems
})

const itemsFailure = () => ({
    type: ITEMS_FAILURE
})

const itemsTimeout = () => ({
    type : ITEMS_TIMEOUT
})

const selectRewardHelper = (rewardId, title, pic, price) => ({
    type: ITEMS_SELECT,
    rewardId,
    title,
    pic,
    price
});


export const selectReward = (rewardId, title, pic, price) => (dispatch) => {
    console.log('Actions: ' + price);
    dispatch(selectRewardHelper(rewardId, title, pic, price))
}

export const getItems = (wallet, purchased) => async (dispatch) => {
    dispatch(itemsLoading());

    try {
        /* =====  Item getItems ==== */
        //const itemContract = new ethers.Contract('0xDc8e83240f8271769119B56A85B0e788a43A3a25', Items, wallet)
        //const items = await itemContract.getItems();

        /* ===== Dummy Items getItems Response ==== */
        const items = {
            "_itemNonce": "itemNonce",
            "_titles": [
                'Item 1',
                'Item 2'
            ],
            "_descriptions": [
                'Item 1 Description',
                'Item 2 Description'
            ],
            "_imageUrls": [
                'Item 1 imageUrl',
                'Item 2 imageUrl'
            ],
            "_costs": [
                'Item 1 Cost',
                'Item 2 Cost'
            ],
            "_infinites": [
                'Item 1 Description',
                'Item 2 Description'
            ],
            "_quantities": [
                'Item 1 Quantity',
                'Item 2 Quantity'
            ],
            "_actives": [
                'true',
                'true'
            ]
        }

        var pItems = [];
        var npItems = [];
        var allItems = [];

        for (index = 0; index < items._titles.length; index++) {
            var obj = {
                title: items._titles[index],
                description: items._descriptions[index],
                imageUrl: items._imageUrls[index],
                cost: items._costs[index],
                infinite: items._infinites[index],
                quantity: items._quantities[index],
                active: items._actives[index]
            }
            
            if (purchased.includes(index)) {
                pItems.push(obj)
            } else {
                npItems.push(obj)
            }

            allItems.push(obj)
        }

        console.log("itemActions: ", allItems)

        dispatch(itemsSuccess(pItems, npItems, allItems));
    } catch (e) {
        console.log(e)
    }
}