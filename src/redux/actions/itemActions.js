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

const itemsFailure = (error) => ({
    type: ITEMS_FAILURE,
    error
})

const itemsTimeout = () => ({
    type : ITEMS_TIMEOUT
})

export const getItems = () => async (dispatch) => {
    dispatch(itemsLoading());

    //Do api call
    var res = await QueryHandler.getItemSerials();
    console.log("Item Serials: " + JSON.stringify(res.data));

    if (!res) {
        dispatch(itemsFailure(res.status));
    } else if (res['status' === 200]) {
        dispatch(itemsSuccess(res.data.active));
    } else {
        dispatch(itemsTimeout());
    }
}