// import { , createStore } from "redux";

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import comineReducer from './reducers';

const store = createStore(comineReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store;

