import {DIARY_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";

type SetTimersActionType = {
    type: typeof SET_DIARIES,
    payload: Array<DiaryIdAndTitleType>
}

type InitialStateType =  {
    diaries: Array<DiaryIdAndTitleType>
};


export type DiaryIdAndTitleType = {
    id: string,
    title: string
}

const SET_DIARIES = 'DIARIES/SET_DIARIES'

const initialState: InitialStateType = {
    diaries: []
}

const diariesReducer = (state: InitialStateType = initialState, action: SetTimersActionType): InitialStateType => {
    switch (action.type) {
        case SET_DIARIES:
            return {
                ...state,
                diaries: action.payload
            }
        default:
            return state;
    }
}

const setDiaries = (payload: Array<DiaryIdAndTitleType>) : SetTimersActionType => ({type: SET_DIARIES, payload})


export const deleteDiary = (diaryId: string) => {
    return async (dispatch) => {
        const response = await DIARY_API.deleteDiary(diaryId)
        if (response.status === 204) {
            dispatch(requestDiaries())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestDiaries())
        }
    }
}

export const requestDiaries = () => {
    return async (dispatch) => {
        const response = await DIARY_API.getDiaries()
        if (response.status === 200) {
            const diariesResp: Array<DiaryIdAndTitleType> = response.data
            dispatch(setDiaries(diariesResp))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestDiaries())
        }
    }
}

export default diariesReducer;