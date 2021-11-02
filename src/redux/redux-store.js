import {combineReducers, createStore} from "redux";
import timerReducer from "./timer-reducer";

let reducers = combineReducers({

    timerPage: timerReducer

});


let store = createStore(reducers);

window.store = store;

export default store;