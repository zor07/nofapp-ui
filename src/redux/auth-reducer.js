import {AUTH_API} from "../api/api";

const SET_ACCESS_TOKEN = "AUTH/SET_ACCESS_TOKEN"
const SET_REFRESH_TOKEN = "AUTH/SET_REFRESH_TOKEN"

const initialState = {
    accessToken: null,
    refreshToken: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_TOKEN:
            return {...state, accessToken: action.accessToken}
        case SET_REFRESH_TOKEN:
            return {...state, refreshToken: action.refreshToken}
        default:
            return state;
    }
}

const setAccessToken = (accessToken) => ({type: SET_ACCESS_TOKEN, accessToken})
const setRefreshToken = (refreshToken) => ({type: SET_ACCESS_TOKEN, refreshToken})

export const login = (username, password) => {
    return async (dispatch) => {
        const response = await AUTH_API.login(username, password);
        dispatch(setAccessToken(response.access_token))
        dispatch(setRefreshToken(response.refresh_token))
    }
}


export default authReducer;