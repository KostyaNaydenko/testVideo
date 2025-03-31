import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_EVENTS_REQUEST, fetchEventsSuccess, fetchEventsFailure } from '../actions/analyticsActions';
import { AnalyticsEvent } from '../types';

export const API_URL = 'https://my-db-nu.vercel.app/db.json';

export const fetchEventsFromApi = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AnalyticsEvent[] = await response.json();
    return data;
};

export const fetchEventsFromLocalStorage = () => {
    try {
        if (localStorage.getItem('events')) {
            return JSON.parse(localStorage.getItem('events') as string) as AnalyticsEvent[];
        }
        return null;
    } catch (error: any) {
        console.error("Error parsing events from localStorage:", error);
        localStorage.removeItem('events');
        return null;
    }
};

export function* fetchEventsSaga() {
    try {
        let events: AnalyticsEvent[] | null = yield call(fetchEventsFromLocalStorage);

        if (!events) {
            events = yield call(fetchEventsFromApi);
            localStorage.setItem('events', JSON.stringify(events));
        }

        yield put(fetchEventsSuccess(events as AnalyticsEvent[]));
    } catch (error: any) {
        yield put(fetchEventsFailure(error.message));
    }
}

export function* watchFetchEvents() {
    yield takeLatest(FETCH_EVENTS_REQUEST, fetchEventsSaga);
}