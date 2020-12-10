import { 
    ANNOUNCEMENT_FAILURE,
    ANNOUNCEMENT_LOADING,
    ANNOUNCEMENT_SUCCESS,
    ANNOUNCEMENT_TIMEOUT
} from './constants';
import QueryHandler from '../../api/QueryHandler';

const announcementsLoading = () => ({
    type: ANNOUNCEMENT_LOADING
})

const announcementsSuccess = (data) => ({
    type: ANNOUNCEMENT_SUCCESS,
    data
})

const announcementsFailure = () => ({
    type: ANNOUNCEMENT_FAILURE
})

const announcementsTimeout = () => ({
    type : ANNOUNCEMENT_TIMEOUT
})

export const getAnnouncements = (token) => async (dispatch) => {
    dispatch(announcementsLoading());
    console.log("Announcement: " + token);
    //Do api call
    var res = await QueryHandler.getAnnouncements(token);
    console.log("Annoucement: " + JSON.stringify(res.data.announcements));
    if (!res) {
        console.log("Announcements Failure...");
        dispatch(announcementsFailure());
    } else if (res['status'] === 200) {
        console.log("Announcements Success...");
        dispatch(announcementsSuccess(res.data.announcements));
    } else {
        console.log("Announcments Timeout...");
        dispatch(announcementsTimeout());
    }
}