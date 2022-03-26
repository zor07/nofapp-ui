import {PRACTICE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {DEFAULT_CONTENT} from "./practice-reducer";

export type PracticeListEntryType = {
    id: string | null
    name: string
    description: string
}

type InitialStateType = {
    practices: Array<PracticeListEntryType> | null,
    createdPracticeId: string | null
};

const SET_PRACTICES = 'PRACTICE/SET_PRACTICES'
const SET_CREATED_PRACTICE_ID = 'PRACTICE/SET_CREATED_PRACTICE_ID'

type SetPracticesActionType = {
    type: typeof SET_PRACTICES,
    payload: Array<PracticeListEntryType> | null
}

type SetCreatedPracticeIdActionType = {
    type: typeof SET_CREATED_PRACTICE_ID
    id: string | null
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
    }],
    createdPracticeId: null
}

export const practiceListReducer = (state: InitialStateType = initialState, action: SetPracticesActionType | SetCreatedPracticeIdActionType): InitialStateType => {
    switch (action.type) {
        case SET_PRACTICES:
            return {
                ...state,
                practices: action.payload
            }
        case SET_CREATED_PRACTICE_ID:
            return {
                ...state,
                createdPracticeId: action.id
            }
        default:
            return state;
    }
}

export const setPractices = (payload: Array<PracticeListEntryType>): SetPracticesActionType => ({
    type: SET_PRACTICES,
    payload
})
const setCreatedPracticeIdAction = (id: string): SetCreatedPracticeIdActionType => ({type: SET_CREATED_PRACTICE_ID, id})

export const createNewPractice = (isPublic: boolean) => {
    return async (dispatch) => {
        const practice = {
            id: null,
            name: 'Practice',
            practiceTag: {
                id: 1,
                name: 'test'
            },
            description: 'Practice Description',
            data: JSON.parse(DEFAULT_CONTENT),
            isPublic: isPublic
        }
        const response = await PRACTICE_API.savePractice(practice)
        if (response.status === 201) {
            const newPracticeId: string = response.data.id
            dispatch(setCreatedPracticeIdAction(newPracticeId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(createNewPractice(isPublic))
        }
    }
}

export const clearCreatedPracticeId = () => {
    return async (dispatch) => {
        dispatch(setCreatedPracticeIdAction(null))
    }
}

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

export const deletePractice = (practiceId : string, isPublic: boolean) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.deletePractice(practiceId)
        if (response.status === 204) {
            dispatch(getPractices(isPublic))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(deletePractice(practiceId, isPublic))
        }
    }
}

export const addPracticeToUser = (practiceId: string) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.addPracticeToUser(practiceId)
        if (response.status !== 204 && isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(addPracticeToUser(practiceId))
        }
    }
}
