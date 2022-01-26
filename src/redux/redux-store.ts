import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import timerReducer from "./timer-reducer";
import diariesReducer from "./diaries-reducer";
import diaryReducer from "./diary-reducer";

let rootReducer = combineReducers({

    timerPage: timerReducer,
    auth: authReducer,
    app: appReducer,
    diaries: diariesReducer,
    diary: diaryReducer

});


type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;

export default store;