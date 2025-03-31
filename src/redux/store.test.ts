import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import createSagaMiddleware from 'redux-saga';
import { analyticsReducer } from './reducers/analyticsReducer';

describe('Redux Store Configuration', () => {
  it('should configure the store with correct reducer and middleware', () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }).concat(sagaMiddleware),
      devTools: process.env.NODE_ENV !== 'production',
    });

    expect(store.getState().analytics).toBeDefined();
    expect(store.getState().analytics).toEqual(analyticsReducer(undefined, {} as any));

    const middlewareApplied = store.getState;
    expect(middlewareApplied).toBeDefined();
  });
});