import { 
    ITEMS_LOADING, 
    ITEMS_SUCCESS, 
    ITEMS_FAILURE, 
    ITEMS_TIMEOUT
} from './constants';
import QueryHandler from '../../api/QueryHandler';

const itemsLoading = () => ({
    type: ITEMS_LOADING
})

const itemsSuccess = (data) => ({
    type: ITEMS_SUCCESS,
    data
})

const itemsFailure = () => ({
    type: ITEMS_FAILURE
})

const itemsTimeout = () => ({
    type : ITEMS_TIMEOUT
})

export const getItems = (token) => async (dispatch) => {
    dispatch(itemsLoading());

    //Do api call
    var res = await QueryHandler.getItemSerials(token);
    //console.log("Item Serials: " + JSON.stringify(res.data));
    
    if (!res) {
        console.log("ItemFailure...");
        dispatch(itemsFailure());
    } else if (res['status'] === 200) {
        console.log("ItemsSuccess...");
        dispatch(itemsSuccess(res.data.active));
    } else {
        console.log("ItemsTimeout...");
        dispatch(itemsTimeout());
    }
}