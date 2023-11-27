import { combineReducers, createStore } from 'redux';
import modalReducer from './modal.js';

const rootReducer = combineReducers({ modalReducer });

const store = createStore(rootReducer);

export default store;
