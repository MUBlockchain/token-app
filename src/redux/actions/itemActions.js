import { 
    ITEMS_LOADING, 
    ITEMS_SUCCESS, 
    ITEMS_FAILURE, 
    ITEMS_TIMEOUT,
    ITEMS_SELECT
} from './constants';
import QueryHandler from '../../api/QueryHandler';
import RewardProductComponent from '../../components/RewardProductComponent';

const itemsLoading = () => ({
    type: ITEMS_LOADING
})

const itemsSuccess = (pItems, npItems, items) => ({
    type: ITEMS_SUCCESS,
    pItems,
    npItems,
    items
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

export const getItems = (token, userId) => async (dispatch) => {
    dispatch(itemsLoading());

    //Do api call
    var res = await QueryHandler.getItemSerials(token);
    //console.log("Item Serials: " + JSON.stringify(res.data));
    
    if (!res) {
        console.log("ItemFailure...");
        dispatch(itemsFailure());
    } else if (res['status'] === 200) {
        console.log("ItemsSuccess...");
        var pItems = [];
        var npItems = [];

        console.log("userId:" + userId)
        //console.log('Active:' + JSON.stringify(res.data.active));
        res.data.active.forEach(item => {
            //console.log(item.purchasers)
            if (item.purchasers.includes(userId)) {
                pItems.push(item);
            } else {
                npItems.push(item);
            }
        });

        console.log('pItems:' + pItems);
        console.log('npItems:' + npItems);
        dispatch(itemsSuccess(pItems, npItems, res.data.active));
    } else {
        console.log("ItemsTimeout...");
        dispatch(itemsTimeout());
    }
}