import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer.ts";
import appReducer from "./app-reducer";
import timerReducer from "./timer-reducer.ts";

let reducers = combineReducers({

    timerPage: timerReducer,
    auth: authReducer,
    app: appReducer

});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;