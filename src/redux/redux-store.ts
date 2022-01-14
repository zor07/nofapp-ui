import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
// @ts-ignore
import authReducer from "./auth-reducer.ts";
// @ts-ignore
import appReducer from "./app-reducer.ts";
// @ts-ignore
import timerReducer from "./timer-reducer.ts";

let reducers = combineReducers({

    timerPage: timerReducer,
    auth: authReducer,
    app: appReducer

});


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;

export default store;