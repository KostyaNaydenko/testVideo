import { all } from 'redux-saga/effects';
import rootSaga from './rootSaga';
import { watchFetchEvents } from './analyticsSaga';

describe('rootSaga', () => {
  it('should fork all sagas', () => {
    const generator = rootSaga();

    expect(generator.next().value).toEqual(all([watchFetchEvents()]));

    expect(generator.next().done).toBe(true);
  });
});