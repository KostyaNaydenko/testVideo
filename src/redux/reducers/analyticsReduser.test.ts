import { analyticsReducer } from './analyticsReducer';
import {
    FETCH_EVENTS_REQUEST,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    SET_CURRENT_TIME,
} from '../actions/analyticsActions';
import { AnalyticsEvent } from '../types';

describe('analyticsReducer', () => {
    const initialState = {
        events: [],
        currentTime: 0,
        loading: false,
        error: null,
    };

    it('should return the initial state', () => {
        expect(analyticsReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('should handle FETCH_EVENTS_REQUEST', () => {
        const nextState = analyticsReducer(initialState, { type: FETCH_EVENTS_REQUEST });
        expect(nextState).toEqual(initialState);
    });

    it('should handle FETCH_EVENTS_SUCCESS', () => {
        const events: AnalyticsEvent[] = [
            { timestamp: 1, duration: 2, zone: { left: 10, top: 20, width: 30, height: 40 } },
            { timestamp: 3, duration: 4, zone: { left: 50, top: 60, width: 70, height: 80 } },
        ];
        const nextState = analyticsReducer(initialState, { type: FETCH_EVENTS_SUCCESS, payload: events });
        expect(nextState.events).toEqual(events);
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBeNull();
    });

    it('should handle FETCH_EVENTS_FAILURE', () => {
        const error = 'Failed to fetch events';
        const nextState = analyticsReducer(initialState, { type: FETCH_EVENTS_FAILURE, payload: error });
        expect(nextState.events).toEqual([]);
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toEqual(error);
    });

    it('should handle SET_CURRENT_TIME', () => {
        const currentTime = 123;
        const nextState = analyticsReducer(initialState, { type: SET_CURRENT_TIME, payload: currentTime });
        expect(nextState.currentTime).toEqual(currentTime);
    });
});