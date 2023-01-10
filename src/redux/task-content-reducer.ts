import {TASK_CONTENT_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {AppDispatch} from "./redux-store";
import {RemirrorJSON} from "remirror";
import {TaskType} from "./tasks-reducer";
import {TaskContentType} from "./task-content-list-reducer";
import {PracticeType, setPractice} from "./practice-reducer";

type SetTaskContentActionType = {
    type: typeof SET_TASK_CONTENT
    payload: TaskContentType
}

type UnmountTaskContentActionType = {
    type: typeof UNMOUNT_TASK_CONTENT
}

type TaskContentStateType = {
    taskContent: TaskContentType
}

const initialState: TaskContentStateType = {
    taskContent: null
}

export const DEFAULT_TASK_CONTENT_DATA = `{
    "type": "doc",
    "content": [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "Enter task name"
                }
            ]
        }
    ]
}`

const SET_TASK_CONTENT = 'TASK_CONTENT/SET_TASK_CONTENT'
const UNMOUNT_TASK_CONTENT = 'TASK_CONTENT/UNMOUNT_TASK_CONTENT'

const taskContentReducer = (state: TaskContentStateType = initialState, action: SetTaskContentActionType | UnmountTaskContentActionType): TaskContentStateType => {
    switch (action.type) {
        case SET_TASK_CONTENT:
            return {
                ...state,
                taskContent: action.payload
            }
        case UNMOUNT_TASK_CONTENT:
            return {
                ...state,
                taskContent: null
            }
        default:
            return state
    }
}

const setTaskContent = (payload: TaskContentType): SetTaskContentActionType => ({type: SET_TASK_CONTENT, payload})
const unmountTaskContentAction = (): UnmountTaskContentActionType => ({type: UNMOUNT_TASK_CONTENT})

export const requestTaskContent = (levelId: string, taskId: string, taskContentId: string) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASK_CONTENT_API.getTaskContent(levelId, taskId, taskContentId)
        if (response.status === 200) {
            const taskContent: TaskContentType = response.data
            if (!taskContent.data) {
                taskContent.data = JSON.parse(DEFAULT_TASK_CONTENT_DATA)
            }
            await dispatch(setTaskContent(taskContent))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(requestTaskContent(levelId, taskId, taskContentId)))
        }
    }
}

export const updateTaskContent = (levelId: string, taskId: string, taskContentId: string, taskContent: TaskContentType) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASK_CONTENT_API.updateTaskContent(levelId, taskId, taskContentId, taskContent)
        if (response.status === 202) {
            const taskContent: TaskContentType = response.data
            if (!taskContent.data) {
                taskContent.data = JSON.parse(DEFAULT_TASK_CONTENT_DATA)
            }
            await dispatch(setTaskContent(taskContent))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(updateTaskContent(levelId, taskId, taskContentId, taskContent)))
        }
    }
}

export const unmountTaskContent = () => {
    return (dispatch) => {
        dispatch(unmountTaskContentAction())
    }
}

export default taskContentReducer