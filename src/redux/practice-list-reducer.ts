import {PRACTICE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";

export type PracticeListEntryType = {
    id: string | null
    name: string
    description: string
}

type InitialStateType = {
    practices: Array<PracticeListEntryType> | null
};

const SET_PRACTICES = 'PRACTICE/SET_PRACTICES'

type SetPracticesActionType = {
    type: typeof SET_PRACTICES,
    payload: Array<PracticeListEntryType> | null
}

const initialState: InitialStateType = {
    practices: [{
        id: "1",
        name: "Default practice 1",
        description: "Default practice description 1",
    }, {
        id: "2",
        name: "Default practice 2",
        description: "Default practice description 2",
    }]
}

export const practiceListReducer = (state: InitialStateType = initialState, action: SetPracticesActionType): InitialStateType => {
    switch (action.type) {
        case SET_PRACTICES:
            return {
                ...state,
                practices: action.payload
            }
        default:
            return state;
    }
}

export const setPractices = (payload: Array<PracticeListEntryType>): SetPracticesActionType => ({
    type: SET_PRACTICES,
    payload
})

export const getPractices = (isPublic: boolean) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.getPractices(isPublic)
        if (response.status === 200) {
            const practices: Array<PracticeListEntryType> = response.data.map(p => ({
                id: p.id, name: p.name, description: p.description
            }))
            dispatch(setPractices(practices))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getPractices(isPublic))
        }
    }
}
