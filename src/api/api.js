import axios from "axios";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV.toString()
})

const cookies = new Cookies()

export const AUTH_API = {
    login(username, password) {
        return instance.post(`auth/login`, {username, password})
    },
    me() {
        return instance.get(`auth/me`, getAuthConfig(cookies.get("accessToken"))).catch((error) => {
            return handleError(error)
        })
    },
    refreshAccessToken() {
        return instance.get(`auth/token/refresh`, {
            headers: {
                "Authorization": `Bearer ${cookies.get("refreshToken")}`
            }
        })
    }
}

export const TIMER_API = {
    getTimers() {
        return instance.get(`timers`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    startTimer(timerData) {
        return instance.post(`timers`, timerData, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    stopTimer(timerId) {
        return instance.put(`timers/${timerId}/stop`, null, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteTimer(timerId) {
        return instance.delete(`timers/${timerId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const DIARY_API = {
    getDiaries() {
        return instance.get(`diary`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    getDiary(diaryId) {
        return instance.get(`diary/${diaryId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    saveDiary(diary) {
        return instance.post(`diary`, diary, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteDiary(diaryId) {
        return instance.delete(`diary/${diaryId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const NOTEBOOKS_API = {
    getNotebooks() {
        return instance.get('notebooks', getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    createNotebook(notebook) {
        return instance.post('notebooks', notebook, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    updateNotebook(notebook) {
        return instance.put('notebooks', notebook, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteNotebook(notebookId) {
        return instance.delete(`notebooks/${notebookId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const PRACTICE_API = {
    getPractices(isPublic = false) {
        return instance.get(`practices?isPublic=${isPublic}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    getPractice(practiceId) {
        return instance.get(`practices/${practiceId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    addPracticeToUser(practiceId) {
        return instance.put(`practices/${practiceId}`, null, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    savePractice(practice) {
        return instance.post(`practices`, practice, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    updatePractice(practice) {
        return instance.put(`practices`, practice, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
    deletePractice(practiceId) {
        return instance.delete(`practices/${practiceId}`, getAuthConfig(cookies.get("accessToken")))
            .catch((error) => {
                return handleError(error)
            })
    },
}

const getAuthConfig = (accessToken) => {
    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
}

const handleError = (error) => {
    if (error.response && error.response.status === 403) {
        return error.response
    } else {
        console.error(error)
    }
}