import { ANNOUNCEMENT_FAILURE, ANNOUNCEMENT_TIMEOUT, ANNOUNCEMENT_SUCCESS, ANNOUNCEMENT_LOADING } from '../actions/constants';

const initAnnouncementState = {
    isLoading: false,
    announcements: [],
    errorBack: false,
    error: '',
    timeoutOccurred: false
}


const announcementReducer = (state = initAnnouncementState, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_LOADING:
            return {
                ...state,
                isLoading: true,
                errorBack: false,
                timeoutOccurred: false
            };
        case ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorBack: false,
                timeoutOccurred: false,
                announcements: action.data
            };
        case ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorBack: true,
                timeoutOccurred: false,
                error: 'Error while fetching Announcements'
            };
        case ANNOUNCEMENT_TIMEOUT:
            return {
                ...state,
                isLoading: false,
                timeoutOccurred: true,
                errorBack: true,
                error: 'Connection Timeout to API'
            };    
        default:
            return state;
    }
}

export default announcementReducer;