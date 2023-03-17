import {TASK_CONTENT_API, TASKS_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {LevelType} from "./levels-reducer";
import {AppDispatch} from "./redux-store";
import {RemirrorJSON} from "remirror";
import {requestTasks, TaskType} from "./tasks-reducer";
import {TaskContentType} from "./task-content-list-reducer";
import {DEFAULT_TASK_CONTENT_DATA, requestTaskContent} from "./task-content-reducer";

type SetTaskActionType = {
    type: typeof SET_TASK
    payload: TaskType
}

type UnmountTaskActionType = {
    type: typeof UNMOUNT_TASK
}

type TasksStateType = {
    task: TaskType
}

const initialState: TasksStateType = {
    task: null
}
export const DEFAULT_TASK_DATA = `{
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

const SET_TASK = 'TASK_EDITOR/SET_TASK'
const UNMOUNT_TASK = 'TASK_EDITOR/UNMOUNT_TASK'

const taskEditorReducer = (state: TasksStateType = initialState, action: SetTaskActionType | UnmountTaskActionType): TasksStateType => {
    switch (action.type) {
        case SET_TASK:
            return {
                ...state,
                task: action.payload
            }
        case UNMOUNT_TASK:
            return {
                ...state,
                task: null
            }
        default:
            return state
    }
}

const setTask = (payload: TaskType): SetTaskActionType => ({type: SET_TASK, payload})
const unmountTaskAction = (): UnmountTaskActionType => ({type: UNMOUNT_TASK})

export const saveTask = (levelId: string, task: TaskType) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASKS_API.createLevelTask(levelId, task)
        if (response.status === 201) {
            const responseTask: TaskType = response.data
            if (!responseTask.data) {
                responseTask.data = JSON.parse(DEFAULT_TASK_CONTENT_DATA)
            }
            if (responseTask.fileUri) {
                responseTask.fileUri = `http://127.0.0.1:9000/${responseTask.fileUri}`
            }
            await dispatch(requestTask(levelId, responseTask.id))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(saveTask(levelId, task)))
        }
    }
}


export const requestTask = (levelId: string, taskId: string) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASKS_API.getLevelTask(levelId, taskId)
        if (response.status === 200) {
            const task: TaskType = response.data
            if (!task.data) {
                task.data = JSON.parse(DEFAULT_TASK_CONTENT_DATA)
            }
            if (task.fileUri) {
                task.fileUri = `http://127.0.0.1:9000/${task.fileUri}`
            }
            await dispatch(setTask(task))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(requestTask(levelId, taskId)))
        }
    }
}

export const uploadVideo = (levelId: string, taskId: string, file: File) => {
    return async (dispatch: AppDispatch) => {
        const response = await TASKS_API.uploadMediaToTask(levelId, taskId, file);
        if (response.status === 200) {
            await dispatch(requestTask(levelId, taskId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(uploadVideo(levelId, taskId, file)))
        }
    }
}


export const unmountTask = () => {
    return (dispatch) => {
        dispatch(unmountTaskAction())
    }
}

export default taskEditorReducer