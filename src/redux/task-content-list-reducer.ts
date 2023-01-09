import {TASK_CONTENT_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {AppDispatch} from "./redux-store";
import {RemirrorJSON} from "remirror";
import {TaskType} from "./tasks-reducer";

export type TaskContentType = {
    id: string,
    title: string,
    order: number,
    fileUri: string | null,
    data: RemirrorJSON | null,
    task: TaskType
}

type SetTaskContentListActionType = {
    type: typeof SET_TASK_CONTENT_LIST
    payload: Array<TaskContentType>
}

type UnmountTaskContentListActionType = {
    type: typeof UNMOUNT_TASK_CONTENT_LIST
}

type TasksStateType = {
    taskContentList: Array<TaskContentType>
}

const initialState: TasksStateType = {
    taskContentList: []
}

const SET_TASK_CONTENT_LIST = 'TASK_CONTENTS/SET_TASK_CONTENTS'
const UNMOUNT_TASK_CONTENT_LIST = 'TASK_CONTENTS/UNMOUNT_TASK_CONTENTS'

const taskContentListReducer = (state: TasksStateType = initialState, action: SetTaskContentListActionType | UnmountTaskContentListActionType): TasksStateType => {
    switch (action.type) {
        case SET_TASK_CONTENT_LIST:
            return {
                ...state,
                taskContentList: action.payload
            }
        case UNMOUNT_TASK_CONTENT_LIST:
            return {
                ...state,
                taskContentList: []
            }
        default:
            return state
    }
}

const setTaskContentList = (payload: Array<TaskContentType>): SetTaskContentListActionType => ({type: SET_TASK_CONTENT_LIST, payload})
const unmountTaskContentListAction = (): UnmountTaskContentListActionType => ({type: UNMOUNT_TASK_CONTENT_LIST})

export const requestTaskContentList = (levelId: string, taskId: string) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASK_CONTENT_API.getTaskContents(levelId, taskId)
        if (response.status === 200) {
            await dispatch(setTaskContentList(response.data))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(setTaskContentList(response.data)))
        }
    }
}

export const createTaskContent = (levelId: string, taskId: string, taskContent: TaskType) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASK_CONTENT_API.createTaskContent(levelId, taskId, taskContent)
        if (response.status === 201) {
            await dispatch(requestTaskContentList(levelId, taskId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(requestTaskContentList(levelId, taskId)))
        }
    }
}

export const deleteTaskContent = (levelId: string, taskId: string, taskContentId: string) => {
    return async (dispatch) => {
        const response = await TASK_CONTENT_API.deleteTaskContent(levelId, taskId, taskContentId)
        if (response.status === 204) {
            await dispatch(requestTaskContentList(levelId, taskId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => deleteTaskContent(levelId, taskId, taskContentId))
        }
    }
}

export const unmountTaskContentList = () => {
    return (dispatch) => {
        dispatch(unmountTaskContentListAction())
    }
}

export default taskContentListReducer