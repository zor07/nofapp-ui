import {DIARY_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {currentDateString} from "../utils/dateUtils";
import {DEFAULT_CONTENT, DiaryType} from "./diary-reducer";

type SetDiariesActionType = {
    type: typeof SET_DIARIES,
    payload: Array<DiaryIdAndTitleType>
}

type SetCreatedDiaryIdActionType = {
    type: typeof SET_CREATED_DIARY_ID
    id: string
}

type InitialStateType =  {
    diaries: Array<DiaryIdAndTitleType>
    createdDiaryId: string | null
};

export type DiaryIdAndTitleType = {
    id: string,
    title: string
}

const SET_DIARIES = 'DIARIES/SET_DIARIES'
const SET_CREATED_DIARY_ID =  'DIARY/SET_CREATED_DIARY_ID'

const initialState: InitialStateType = {
    diaries: [],
    createdDiaryId: null
}

const diariesReducer = (state: InitialStateType = initialState, action: SetDiariesActionType | SetCreatedDiaryIdActionType): InitialStateType => {
    switch (action.type) {
        case SET_DIARIES:
            return {
                ...state,
                diaries: action.payload
            }
        case SET_CREATED_DIARY_ID:
            return {
                ...state,
                createdDiaryId: action.id
            }
        default:
            return state;
    }
}

const setDiaries = (payload: Array<DiaryIdAndTitleType>) : SetDiariesActionType => ({type: SET_DIARIES, payload})
const setCreatedDiaryId = (id: string): SetCreatedDiaryIdActionType => ({type: SET_CREATED_DIARY_ID, id})

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

export const createNewDiary = () => {
    return async (dispatch) => {
        const diary: DiaryType = {
            id: null,
            title: currentDateString(),
            data: {
                content: DEFAULT_CONTENT,
                selection: {anchor: 0, head: 0}
            }
        }
        const response = await DIARY_API.saveDiary(diary)
        if (response.status === 201) {
            const newDiaryId: string = response.data.id
            dispatch(setCreatedDiaryId(newDiaryId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(createNewDiary())
        }
    }
}

export const clearCreatedDiaryId = () => {
    return async (dispatch) => {
        dispatch(setCreatedDiaryId(null))
    }
}

export default diariesReducer;