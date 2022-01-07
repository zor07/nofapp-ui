import {AUTH_API} from "../api/api";
import Cookies from 'universal-cookie';

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const initialState = {
    id: null,
    name: null,
    username: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, id: action.id, name: action.name, username: action.username}
        default:
            return state;
    }
}

const setUserData = (id, name, username) => ({type: SET_USER_DATA, id, name, username})

export const me = () => {
    return async (dispatch) => {
        const response = await AUTH_API.me()
        if (response.status === 200) {
            dispatch(setUserData(response.id, response.name, response.username))
        } else if (response.status === 403 && response.data.error_message.includes('The Token has expired')) {
            dispatch(refreshToken())
        }

    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const response = await AUTH_API.login(username, password);
        if (response.status === 200) {
            updateCoockies(response.data.access_token, response.data.refresh_token)
            setTimeout(() => {
                dispatch(me())
            }, 3000)
        }

    }
}

export const refreshToken = () => {
    return async (dispatch) => {
        const response = await AUTH_API.refreshAccessToken()
        if (response.status === 200) {
            updateCoockies(response.data.access_token, response.data.refresh_token)
            dispatch(me())
        }
    }
}

const updateCoockies = (accessToken, refreshToken) => {
    const cookies = new Cookies();
    cookies.set('accessToken', accessToken, {path: '/'});
    cookies.set('refreshToken', refreshToken, {path: '/'});
}

export default authReducer;