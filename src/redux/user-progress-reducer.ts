import {USER_PROGRESS_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {AppDispatch} from "./redux-store";
import {TaskType} from "./tasks-reducer";

type InitialStateType = {
    userProgress: UserProgressType
};

export type UserProgressType = {
    uncompletedTask: TaskType
    userTasks: Array<UserTaskType>
}

export type UserTaskType = {
    task: TaskType
    completed: boolean
}

type SetUserProgressActionType = {
    type: typeof SET_USER_PROGRESS
    payload: UserProgressType
}


const SET_USER_PROGRESS = 'USER_PROGRESS/SET_USER_PROGRESS'

const initialState: InitialStateType = {
    userProgress: null
}

const userProgressReducer = (state: InitialStateType = initialState,
                             action: SetUserProgressActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_PROGRESS:
            return {
                ...state,
                userProgress: action.payload
            }
        default:
            return state;
    }
}

const setUserProgressActionCreator = (payload: UserProgressType): SetUserProgressActionType => ({
    type: SET_USER_PROGRESS,
    payload
})

export const fetchUserProgress = () => {
    return async (dispatch: AppDispatch) => {
        const userProgressResponse = await USER_PROGRESS_API.fetchUserProgress()
        if (userProgressResponse.status === 200) {
            await dispatch(setUserProgressActionCreator(userProgressResponse.data))
        } else if (isTokenExpired(userProgressResponse)) {
            dispatch(refreshToken())
                .then(() => dispatch(fetchUserProgress()))
        }
    }
}

export const finishCurrentTask = () => {
    return async (dispatch: AppDispatch) => {
        const response = await USER_PROGRESS_API.finishCurrentTask()
        if (response.status === 201) {
            await dispatch(fetchUserProgress())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
                .then(() => dispatch(finishCurrentTask()))
        }
    }
}

export default userProgressReducer