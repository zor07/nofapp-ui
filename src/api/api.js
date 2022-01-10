import axios from "axios";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:8888/api/v1/'
})

const cookies = new Cookies()

export const AUTH_API = {
    login(username, password) {
        return instance.post(`auth/login`, {username, password})
    },
    me() {
        return instance.get(`auth/me`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    refreshAccessToken() {
        return instance.get(`auth/token/refresh`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("refreshToken")}`
            }
        })
    }
}

export const TIMER_API = {
    getTimers() {
        return instance.get(`timer`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    }
}

const handleError = (error) => {
    if (error.response && error.response.status === 403) {
        return error.response
    } else {
        console.error(error)
    }
}