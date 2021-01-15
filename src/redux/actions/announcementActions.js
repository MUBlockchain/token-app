import { 
    ANNOUNCEMENT_FAILURE,
    ANNOUNCEMENT_LOADING,
    ANNOUNCEMENT_SUCCESS,
    ANNOUNCEMENT_TIMEOUT
} from './constants';
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from 'ethers'

const Announcements = require('../../abi/Announcements.json')

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

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export const getAnnouncements = (wallet) => async (dispatch) => {
    dispatch(announcementsLoading());

    /* =====  Announcement getAnnouncements ==== */
    //const announcementContract = new ethers.Contract('0x606232693ee7904044010Fe3D24e509d24b2696E', Announcements, wallet)
    //const announcements = await announcementContract.getAnnouncements();

    /* ===== Dummy Announcement getAnnouncements ==== */
    const announcements = {
        "_nonce": "1",
        "_titles": [
            "Title 1",
            "Title 2"
        ],
        "_bodies": [
            "Body 1",
            "Body 2 Pinned"
        ],
        "_timecodes": [
            "Timecode 1",
            "Timecode 2"
        ],
        "_pinned": "1"
    }

    const formatted = [];

    for (index = 0; index < announcements._titles.length; index++) {
        var obj = {
            title: announcements._titles[index],
            body: announcements._bodies[index],
            timecode: announcements._timecodes[index]
        }

        formatted.push(obj);
    }

    array_move(formatted, announcements._pinned, 0)
    console.log('annoucementActions getAnnoucements: ', formatted)

    dispatch(announcementsSuccess(formatted));
}