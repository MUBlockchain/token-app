import { 
    ITEMS_LOADING, 
    ITEMS_SUCCESS, 
    ITEMS_FAILURE, 
    ITEMS_TIMEOUT,
    ITEMS_SELECT,
    ITEMS_PURCHASING,
    ITEMS_PURCHASED
} from './constants';
import "@ethersproject/shims/dist/index.js"
import { ethers } from 'ethers'

const Items = require('../../abi/Items.json')

const itemsLoading = () => ({
    type: ITEMS_LOADING
})

const itemsSuccess = (pItems, npItems, allItems, itemContract) => ({
    type: ITEMS_SUCCESS,
    pItems,
    npItems,
    allItems,
    itemContract
})

const itemsFailure = () => ({
    type: ITEMS_FAILURE
})

const itemsTimeout = () => ({
    type : ITEMS_TIMEOUT
})

const itemsPurchasing = () => ({
    type : ITEMS_PURCHASING
})

const itemsPurchased = () => ({
    type : ITEMS_PURCHASED
})

const selectRewardHelper = (itemIndex) => ({
    type: ITEMS_SELECT,
    itemIndex
});

export const purchaseItem = (index, itemContract) => async (dispatch) => {
    dispatch(itemsPurchasing())

    console.log('FLAG Purchase ITEM', itemContract)
    const item = await itemContract.buyItem(index);
    console.log('FLAG ITEM Purchased', item)
    
    dispatch(itemsPurchased())
}

export const selectReward = (itemIndex) => (dispatch) => {
    console.log('Select Reward: ' + itemIndex);
    dispatch(selectRewardHelper(itemIndex))
}

export const getItems = (wallet, purchased) => async (dispatch) => {
    dispatch(itemsLoading());

    try {
        /* =====  Item getItems ==== */
        console.log('FLAG 2 Wallet: ', wallet)
        const itemContract = new ethers.Contract(Items.networks[42].address, Items.abi, wallet)
        console.log('FLAG 3', itemContract)
        const items = await itemContract.getItems();
        console.log('FLAG 4:', JSON.stringify(items))
        /* ===== Dummy Items getItems Response ==== */
        /*
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
        */

        var pItems = [];
        var npItems = [];
        var allItems = [];

        for (index = 0; index < items[1].length; index++) {
            let isOwned = purchased.includes(index)

            var obj = {
                title: items[1][index],
                description: items[2][index],
                imageUrl: items[3][index],
                cost: items[4][index].toNumber(),
                infinite: items[5][index],
                quantity: items[6][index].toNumber(),
                active: items[7][index],
                isOwned: isOwned,
                itemIndex: index
            }
            
            if (isOwned) {
                pItems.push(obj)
            } else {
                npItems.push(obj)
            }

            allItems.push(obj)
        }

        console.log("itemActions: ", allItems)

        dispatch(itemsSuccess(pItems, npItems, allItems, itemContract));
    } catch (e) {
        console.log(e)
    }
}