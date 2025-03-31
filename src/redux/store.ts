import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { analyticsReducer } from "./reducers/analyticsReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";


const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    analytics: analyticsReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);

export default store;
