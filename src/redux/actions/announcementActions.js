import { 
    ANNOUNCEMENT_FAILURE,
    ANNOUNCEMENT_LOADING,
    ANNOUNCEMENT_SUCCESS,
    ANNOUNCEMENT_TIMEOUT
} from './constants';

//import "react-native-get-random-values"
//import "@ethersproject/shims"
import "@ethersproject/shims/dist/index.js"
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
    
    if (!wallet) {
        dispatch(announcementsFailure());
    }
    /* =====  Announcement getAnnouncements ==== */
    //console.log('FLAG 3:', announcementContract)
    
    //let tx = await announcementContract.getAnnouncements();
    //console.log('FLAG 4:', tx)
    
    try {
        console.log('FLAG 2 Wallet: ', wallet)
        const announcementContract = new ethers.Contract('0x606232693ee7904044010Fe3D24e509d24b2696E', Announcements, wallet)
        console.log('FLAG 3', announcementContract)
        const announcements = await announcementContract.getAnnouncements();

        //const receipt = await announcements.wait();
        //console.log('FLAG 4:', JSON.stringify(announcements))

        let formatted = [];

        for (let index = 0; index < announcements[1].length; index++) {
            var obj = {
                title: announcements[1][index],
                body: announcements[2][index],
                timecode: announcements[3][index].toNumber()
            }
            formatted.push(obj);
        }
    
        
        //console.log("HEX:, ", parseInt(announcements[4]._hex, 16))
        //array_move(formatted, parseInt(announcements[4]._hex, 16), 0)
        console.log('annoucementActions getAnnoucements: ', formatted)
    
        dispatch(announcementsSuccess(formatted));
    } catch(e) {
        console.log("Error: ", e)
    }
    

    /* ===== Dummy Announcement getAnnouncements ==== */
    /*
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
    */

   
}