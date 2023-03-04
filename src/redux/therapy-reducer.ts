import {USER_PROGRESS_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {TaskContentType} from "./task-content-list-reducer";
import {AppDispatch} from "./redux-store";

type InitialStateType = {
    taskContentList: Array<TaskContentType>
};

type SetTaskContentListActionType = {
    type: typeof SET_TASK_CONTENT_LIST
    payload: Array<TaskContentType>
}

const SET_TASK_CONTENT_LIST = 'THERAPY/SET_TASK_CONTENT_LIST'

const initialState: InitialStateType = {
    taskContentList: []
}

const therapyReducer = (state: InitialStateType = initialState,
                        action: SetTaskContentListActionType): InitialStateType => {
    switch (action.type) {
        case SET_TASK_CONTENT_LIST:
            return {
                ...state,
                taskContentList: action.payload
            }
        default:
            return state;
    }
}

const setTaskContentListActionCreator = (payload: Array<TaskContentType>): SetTaskContentListActionType => ({
    type: SET_TASK_CONTENT_LIST,
    payload
})

export const getTaskContentListForUser = () => {
    return async (dispatch: AppDispatch) => {
        const response = await USER_PROGRESS_API.getCurrentTaskContent()
        if (response.status === 200) {
            dispatch(setTaskContentListActionCreator(response.data))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(getTaskContentListForUser()))
        }
    }
}

export const nextTask = () => {
    return async (dispatch: AppDispatch) => {
        const response = await USER_PROGRESS_API.nextTask()
        if (response.status === 201) {
            dispatch(getTaskContentListForUser)
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(getTaskContentListForUser()))
        }
    }
}

export default therapyReducer