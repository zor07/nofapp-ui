import {PRACTICE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {RemirrorJSON} from "remirror";
import {currentDateString} from "../utils/dateUtils";
import {refreshToken} from "./auth-reducer";

export type PracticeType = {
    id: string | null
    name: string
    description: string
    data: RemirrorJSON
    isPublic: boolean
}

type InitialStateType = {
    practice: PracticeType | null
};

export const DEFAULT_CONTENT = `{
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
                    "text": "currentDateString()"
                }
            ]
        }
    ]
}`

const SET_PRACTICE = 'PRACTICE/SET_PRACTICE'

type SetPracticeActionType = {
    type: typeof SET_PRACTICE,
    payload: PracticeType
}

const initialState: InitialStateType = {
    practice: {
        id: "1",
        name: "Default practice",
        description: "Default practice description",
        data: JSON.parse(DEFAULT_CONTENT),
        isPublic: true
    }
}

export const practiceReducer = (state: InitialStateType = initialState, action: SetPracticeActionType): InitialStateType => {
    switch (action.type) {
        case SET_PRACTICE:
            return {
                ...state,
                practice: action.payload
            }
        default:
            return state;
    }
}

export const setPractice = (payload: PracticeType): SetPracticeActionType => ({type: SET_PRACTICE, payload})

export const getPractice = (practiceId: string) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.getPractice(practiceId)
        if (response.status === 200) {
            const practice: PracticeType = response.data
            practice.data = JSON.parse(response.data.data)
            dispatch(setPractice(practice))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getPractice(practiceId))
        }
    }
}

export const savePractice = (practice: PracticeType) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.savePractice(practice)
        if (response.status === 201) {
            dispatch(setPractice(practice))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(savePractice(practice))
        }
    }
}
