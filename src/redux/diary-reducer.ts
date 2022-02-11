import {DIARY_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {PrimitiveSelection, RemirrorJSON} from "remirror";
import {currentDateString} from "../utils/dateUtils";

type UnmountDiaryActionType = {
    type: typeof UNMOUNT_DIARY,
}

type SetDiaryActionType = {
    type: typeof SET_DIARY,
    payload: DiaryType
}

type InitialStateType = {
    diary: DiaryType | null
};

export type DiaryState = {
    content: RemirrorJSON,
    selection: PrimitiveSelection | null | undefined
}

export type DiaryType = {
    id: string | null
    title: string
    data: DiaryState
}

const SET_DIARY = 'DIARY/SET_DIARY'
const UNMOUNT_DIARY = 'DIARY/UNMOUNT_DIARY'

export const DEFAULT_CONTENT = {
    type: "doc",
    content: [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": currentDateString()
                }
            ]
        }
    ]
}

const initialState: InitialStateType = {
    diary: {
        id: null,
        title: "",
        data: {
            content: DEFAULT_CONTENT,
            selection: {
                anchor: 0,
                head: 0
            }
        }
    }
}

const diaryReducer = (state: InitialStateType = initialState, action: SetDiaryActionType | UnmountDiaryActionType): InitialStateType => {
    switch (action.type) {
        case SET_DIARY:
            return {
                ...state,
                diary: action.payload
            }
        case UNMOUNT_DIARY:
            return {
                ...state,
                diary: initialState.diary
            }
        default:
            return state;
    }
}

const setDiary = (payload: DiaryType): SetDiaryActionType => ({type: SET_DIARY, payload})
export const clearDiaryAction = (): UnmountDiaryActionType => ({type: UNMOUNT_DIARY})

export const getDiary = (diaryId: string) => {
    return async (dispatch) => {
        const response = await DIARY_API.getDiary(diaryId)
        if (response.status === 200) {
            const diary: DiaryType = response.data
            dispatch(setDiary(diary))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getDiary(diaryId))
        }
    }
}

export const saveDiary = (diary: DiaryType) => {
    return async (dispatch) => {
        const response = await DIARY_API.saveDiary(diary)
        if (response.status === 201) {
            const newDiary: DiaryType = response.data
            dispatch(setDiary(newDiary))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(saveDiary(diary))
        }
    }
}

export default diaryReducer;