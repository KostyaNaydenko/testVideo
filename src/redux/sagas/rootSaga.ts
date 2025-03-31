import { all } from 'redux-saga/effects';
import { watchFetchEvents } from './analyticsSaga';


export default function* rootSaga() {
    yield all([
        watchFetchEvents(),
    ]);
}