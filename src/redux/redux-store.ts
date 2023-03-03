import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import timerReducer from "./timer-reducer";
import {practiceReducer} from "./practice-reducer";
import {practiceListReducer} from "./practice-list-reducer";
import notebookReducer from "./notebook-reducer";
import notesReducer from "./notes-reducer";
import noteEditorReducer from "./note-editor-reducer";
import profileReducer from "./profile-reducer";
import profileListReducer from "./profile-list-reducer";
import levelsReducer from "./levels-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import tasksReducer from "./tasks-reducer";
import taskContentListReducer from "./task-content-list-reducer";
import taskContentReducer from "./task-content-reducer";
import therapyReducer from "./therapy-reducer";

let rootReducer = combineReducers({

    timerPage: timerReducer,
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    therapy: therapyReducer,
    levels: levelsReducer,
    tasks: tasksReducer,
    taskContentList: taskContentListReducer,
    taskContent: taskContentReducer,
    profileList: profileListReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<RootState, any, AppAction>;
// @ts-ignore
window.__store__ = store;

export default store;