import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import timerReducer from "./timer-reducer";
import {practiceReducer} from "./practice-reducer";
import {practiceListReducer} from "./practice-list-reducer";
import notebookReducer from "./notebook-reducer";
import notesReducer from "./notes-reducer";
import noteEditorReducer from "./note-editor-reducer";
import profileReducer from "./profile-reducer";

let rootReducer = combineReducers({

    timerPage: timerReducer,
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    notebooks: notebookReducer,
    notes: notesReducer,
    noteEditor: noteEditorReducer,
    practice: practiceReducer,
    practiceList: practiceListReducer

});


type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.__store__ = store;

export default store;