import {PROFILE_API, USER_POSTS_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {adjustForTimezone} from "../utils/dateUtils";
import {NoteType} from "./note-editor-reducer";

export type ProfileType = {
    id: string | null
    avatarUri: string | null
    timerStart: Date
    user: {
        id: string
        name: string
        username: string
    }
}

type InitialStateType =  {
    profile: ProfileType
    posts: Array<NoteType>
};

type SetProfileActionType = {
    type: typeof SET_PROFILE
    payload: ProfileType
}

type SetPostsActionType = {
    type: typeof SET_POSTS
    payload: Array<NoteType>
}

const SET_POSTS = 'PROFILE/SET_POSTS'
const SET_PROFILE = 'PROFILE/SET_PROFILE'

const initialState: InitialStateType = {
    profile: {
        id: "some id",
        user: {
            id: "user id",
            name: "user name",
            username: "username"
        },
        avatarUri: "avatar url",
        timerStart: new Date("2021-11-08T01:00:00.000"),
    },
    posts: []
}

const profileReducer = (state: InitialStateType = initialState,
                        action: SetProfileActionType | SetPostsActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
        case "PROFILE/SET_POSTS":
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

const setProfileActionCreator = (payload : ProfileType) : SetProfileActionType => ({type: SET_PROFILE, payload})
const setProfilePostsActionCreator = (payload :  Array<NoteType>) => ({type: SET_POSTS, payload})

export const getProfile = (userId : string) => {
    return async (dispatch: Function) => {
        const response = await PROFILE_API.getProfile(userId)
        if (response.status === 200) {
            const profile = response.data
            if (profile.avatarUri) {
                profile.avatarUri = `http://127.0.0.1:9000/${profile.avatarUri}`
            }
            profile.timerStart = new Date(adjustForTimezone(profile.timerStart.toString()))
            dispatch(setProfileActionCreator(profile))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getProfile(userId))
        }
    }
}

export const getUserPosts = (userId: string) => {
    return async (dispatch: Function) => {
        const response = await USER_POSTS_API.getUserPosts(userId)
        if (response.status === 200) {
            dispatch(setProfilePostsActionCreator(response.data))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getUserPosts(userId))
        }
    }
}

export const deleteUserPost = (userId: string, noteId: string) => {
    return async (dispatch : Function) => {
        const response = await USER_POSTS_API.deleteUserPost(userId, noteId)
        if (response.status === 204) {
            dispatch(getUserPosts(userId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getUserPosts(userId))
        }
    }
}

export const uploadAvatar = (userId: string, file: File) => {
    return async (dispatch: Function) => {
        const response = await PROFILE_API.uploadAvatar(userId, file);
        if (response.status === 202) {
            dispatch(getProfile(userId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(uploadAvatar(userId, file))
        }
    }
}

export const removeAvatar = (userId: string) => {
    return async (dispatch: Function) => {
        const response = await PROFILE_API.deleteAvatar(userId)
        if (response.status == 204) {
            dispatch(getProfile(userId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(removeAvatar(userId))
        }
    }
}

export const relapsed = (userId : string) => {
    return async (dispatch : Function) => {
        const  response = await PROFILE_API.relapsed(userId)
        if (response.status == 202) {
            dispatch(getProfile(userId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(removeAvatar(userId))
        }
    }
}

export default profileReducer