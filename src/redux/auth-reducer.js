import {AUTH_API} from "../api/api";
import Cookies from 'universal-cookie';
import {isTokenExpired} from "../api/apiUtils";

const SET_USER_DATA = "AUTH/SET_USER_DATA"

const initialState = {
    id: null,
    name: null,
    username: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, id: action.id, name: action.name, username: action.username, isAuth: action.isAuth}
        default:
            return state;
    }
}

const setUserData = (id, name, username, isAuth) => ({type: SET_USER_DATA, id, name, username, isAuth})

export const login = (username, password) => {
    return async (dispatch) => {
        const response = await AUTH_API.login(username, password);
        if (response.status === 200) {
            updateCoockies(response.data.access_token, response.data.refresh_token)
            dispatch(me())
        }

    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setUserData(null, null, null, false));
        updateCoockies(null, null)
    }
}

export const me = () => {
    return async (dispatch) => {
        const response = await AUTH_API.me()
        if (response.status === 200) {
            dispatch(setUserData(response.data.id, response.data.name, response.data.username, true))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
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