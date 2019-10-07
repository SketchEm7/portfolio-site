import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import promiseMiddleware from 'redux-promise-middleware';

import gameModalReducer from './reducers/gameModalReducer';


const sagaMiddleware = createSagaMiddleware();
const reduxLogger = createLogger({ diff: true });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createReduxStore = () => {
    const store = createStore(
        combineReducers({
            gameModal: gameModalReducer,
        }),
        undefined,
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                promiseMiddleware,
                thunkMiddleware,
                reduxLogger))
    );

    return store;
};

export default createReduxStore;