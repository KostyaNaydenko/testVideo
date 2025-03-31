import { AnalyticsState } from "../types";
import { 
    FETCH_EVENTS_REQUEST, 
    FETCH_EVENTS_SUCCESS, 
    FETCH_EVENTS_FAILURE, 
    SET_CURRENT_TIME, 
    AnalyticsActionTypes,
    SET_EVENTS
} from "../actions/analyticsActions";

const initialState: AnalyticsState = {
    events: [],
    currentTime: 0,
    loading: false,
    error: null,
};

export const analyticsReducer = (state = initialState, action: AnalyticsActionTypes): AnalyticsState => {
    switch (action.type) {
        case FETCH_EVENTS_REQUEST:
            return state;
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.payload,
                loading: false,
                error: null,
            }
        case FETCH_EVENTS_FAILURE:
            return {
                ...state,
                events: [],
                loading: false,
                error: action.payload,
            }
        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload,
            }
        default:
            return state;
    }
}