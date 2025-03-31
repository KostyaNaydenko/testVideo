import { call, put } from 'redux-saga/effects';
import { fetchEventsSaga, API_URL } from './analyticsSaga';
import { fetchEventsSuccess, fetchEventsFailure } from '../actions/analyticsActions';
import { AnalyticsEvent } from '../types';
import { fetchEventsFromLocalStorage, fetchEventsFromApi } from './analyticsSaga';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string): string | null => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('fetchEventsSaga', () => {
    const events: AnalyticsEvent[] = [
        { timestamp: 1, duration: 2, zone: { left: 10, top: 20, width: 30, height: 40 } },
        { timestamp: 3, duration: 4, zone: { left: 50, top: 60, width: 70, height: 80 } },
    ];

    const error = 'Failed to fetch events';

    beforeEach(() => {
        localStorage.clear();
    });

    it('should fetch events from localStorage if available', () => {
        localStorage.setItem('events', JSON.stringify(events));

        const generator = fetchEventsSaga();

        expect(generator.next().value).toEqual(call(fetchEventsFromLocalStorage));

        expect(generator.next(events).value).toEqual(put(fetchEventsSuccess(events)));

        expect(generator.next().done).toBe(true);
    });

    it('should fetch events from API if localStorage is empty', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(events),
            }) as any
        );

        const generator = fetchEventsSaga();

        expect(generator.next().value).toEqual(call(fetchEventsFromLocalStorage));

        expect(generator.next(null).value).toEqual(call(fetchEventsFromApi));

        expect(generator.next(events).value).toEqual(put(fetchEventsSuccess(events)));

        expect(generator.next().done).toBe(true);

    });

    it('should handle errors', () => {
        global.fetch = jest.fn(() => Promise.reject(new Error(error)));

        const generator = fetchEventsSaga();

        expect(generator.next().value).toEqual(call(fetchEventsFromLocalStorage));

        expect(generator.next(null).value).toEqual(call(fetchEventsFromApi));

        expect(generator.throw(new Error(error)).value).toEqual(put(fetchEventsFailure(error)));

        expect(generator.next().done).toBe(true);
    });
});