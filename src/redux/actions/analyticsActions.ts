import { AnalyticsEvent } from "../types";

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const SET_EVENTS = 'SET_EVENTS';

interface FetchEventsRequestAction {
    type: typeof FETCH_EVENTS_REQUEST;
}

interface FetchEventsSuccessAction {
    type: typeof FETCH_EVENTS_SUCCESS;
    payload: AnalyticsEvent[];
}

interface FetchEventsFailureAction {
    type: typeof FETCH_EVENTS_FAILURE;
    payload: string;
}

interface SetCurrentTimeAction {
    type: typeof SET_CURRENT_TIME;
    payload: number;
}

export type AnalyticsActionTypes =
    FetchEventsRequestAction |
    FetchEventsSuccessAction |
    FetchEventsFailureAction |
    SetCurrentTimeAction;

export const fetchEventsRequest = (): FetchEventsRequestAction => ({
    type: FETCH_EVENTS_REQUEST,
});

export const fetchEventsSuccess = (events: AnalyticsEvent[]): FetchEventsSuccessAction => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: events,
});

export const fetchEventsFailure = (error: string): FetchEventsFailureAction => ({
    type: FETCH_EVENTS_FAILURE,
    payload: error,
});

export const setCurrentTime = (time: number): SetCurrentTimeAction => ({
    type: SET_CURRENT_TIME,
    payload: time,
});

