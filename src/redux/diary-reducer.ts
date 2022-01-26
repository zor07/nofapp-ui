import {DIARY_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {RemirrorJSON} from "remirror";

type SetDiaryActionType = {
    type: typeof SET_DIARY,
    payload: DiaryType
}

type InitialStateType =  {
    diary: DiaryType | null
};

export type DiaryType = {
    id: string | null
    title: string
    data: RemirrorJSON
}

const SET_DIARY = 'DIARY/SET_DIARY'

const initialState: InitialStateType = {
    diary: {
        id: null,
        title: "",
        data: {
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
                            "text": "24.01.2022"
                        }
                    ]
                }
            ]
        }
    }
}

const diaryReducer = (state: InitialStateType = initialState, action: SetDiaryActionType): InitialStateType => {
    switch (action.type) {
        case SET_DIARY:
            return {
                ...state,
                diary: action.payload
            }
        default:
            return state;
    }
}

const setDiary = (payload: DiaryType) : SetDiaryActionType => ({type: SET_DIARY, payload})


export const requestDiary = (diaryId: string) => {
    return async (dispatch: Function) => {
        const response = await DIARY_API.getDiary(diaryId)
        if (response.status === 200) {
            const diary: DiaryType = response.data
            dispatch(setDiary(diary))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestDiary(diaryId))
        }
    }
}

export const saveDiary = (diary: DiaryType) => {
    return async (dispatch: Function) => {
        const response = await DIARY_API.saveDiary(diary)
        if (response.status === 201) {
            dispatch(setDiary(diary))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(saveDiary(diary))
        }
    }
}

export default diaryReducer;