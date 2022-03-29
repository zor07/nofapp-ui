import {PRACTICE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {DEFAULT_CONTENT} from "./practice-reducer";
import {getDescriptionFromRemirrorJson} from "../utils/stringUtils";

export type PracticeListEntryType = {
    id: string | null
    name: string
    description: string
}

type InitialStateType = {
    publicPractices: Array<PracticeListEntryType> | null,
    userPractices: Array<PracticeListEntryType> | null,
    createdPracticeId: string | null
};

const SET_PUBLIC_PRACTICES = 'PRACTICE/SET_PUBLIC_PRACTICES'
const SET_USER_PRACTICES = 'PRACTICE/SET_USER_PRACTICES'
const SET_CREATED_PRACTICE_ID = 'PRACTICE/SET_CREATED_PRACTICE_ID'

type SetPublicPracticesActionType = {
    type: typeof SET_PUBLIC_PRACTICES,
    payload: Array<PracticeListEntryType> | null
}

type SetUserPracticesActionType = {
    type: typeof SET_USER_PRACTICES,
    payload: Array<PracticeListEntryType> | null
}

type SetCreatedPracticeIdActionType = {
    type: typeof SET_CREATED_PRACTICE_ID
    id: string | null
}

const initialState: InitialStateType = {
    publicPractices: [{
        id: "1",
        name: "Default public practice 1",
        description: "Default public practice description 1",
    }, {
        id: "2",
        name: "Default public practice 2",
        description: "Default public practice description 2",
    }],
    userPractices: [{
        id: "1",
        name: "Default user practice 1",
        description: "Default user practice description 1",
    }, {
        id: "2",
        name: "Default user practice 2",
        description: "Default user practice description 2",
    }],
    createdPracticeId: null
}

export const practiceListReducer = (state: InitialStateType = initialState,
                                    action: SetPublicPracticesActionType |
                                            SetUserPracticesActionType |
                                            SetCreatedPracticeIdActionType): InitialStateType => {
    switch (action.type) {
        case SET_PUBLIC_PRACTICES:
            return {
                ...state,
                publicPractices: action.payload
            }
        case SET_USER_PRACTICES:
            return {
                ...state,
                userPractices: action.payload
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

const setPublicPracticesAction = (payload: Array<PracticeListEntryType>): SetPublicPracticesActionType => ({
    type: SET_PUBLIC_PRACTICES,
    payload
})

const setUserPracticesAction = (payload: Array<PracticeListEntryType>): SetUserPracticesActionType => ({
    type: SET_USER_PRACTICES,
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

export const fetchPractices = () => {
    return async (dispatch) => {
        dispatch(getPractices(true))
        dispatch(getPractices(false))
    }
}

const getPractices = (isPublic: boolean) => {
    return async (dispatch) => {
        const response = await PRACTICE_API.getPractices(isPublic)
        if (response.status === 200) {
            const practices: Array<PracticeListEntryType> = response.data.map(p => ({
                id: p.id,
                name: p.name,
                description: getDescriptionFromRemirrorJson(p.data, '')
            }))
            if (isPublic) {
                dispatch(setPublicPracticesAction(practices))
            } else {
                dispatch(setUserPracticesAction(practices))
            }
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
