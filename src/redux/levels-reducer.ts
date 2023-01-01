import {LEVELS_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";

export type LevelType = {
    id: string
    name: string
    order: number
}

type SetLevelsActionType = {
    type: typeof SET_LEVELS
    payload: Array<LevelType>
}

type LevelsStateType = {
    levels: Array<LevelType>
}

const initialState: LevelsStateType = {
    levels: []
}

const SET_LEVELS = 'LEVELS/SET_LEVELS'

const levelsReducer = (state: LevelsStateType = initialState, action: SetLevelsActionType): LevelsStateType => {
    switch (action.type) {
        case "LEVELS/SET_LEVELS":
            return {
                ...state,
                levels: action.payload
            }
        default:
            return state
    }
}

const setLevels = (payload: Array<LevelType>): SetLevelsActionType => ({type: SET_LEVELS, payload})

export const requestLevels = () => {
    return async (dispatch) => {
        const response = await LEVELS_API.getLevels()
        if (response.status === 200) {
            dispatch(setLevels(response.data))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestLevels())
        }
    }
}

export const createLevel = (level: LevelType) => {
    return async (dispatch) => {
        const response = await LEVELS_API.createLevel(level)
        if (response.status === 201) {
            dispatch(requestLevels)
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(createLevel(level))
        }
    }
}

export const deleteLevel = (levelId: string) => {
    return async (dispatch) => {
        const response = await LEVELS_API.deleteLevel(levelId)
        if (response.status === 204) {
            dispatch(requestLevels)
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(deleteLevel(levelId))
        }
    }
}




export default levelsReducer