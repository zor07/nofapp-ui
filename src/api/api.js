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
    },
    startTimer(timerData) {
        return instance.post(`timer`, timerData,{
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    stopTimer(timerId) {
        return instance.put(`timer/${timerId}/stop`, null,{
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    deleteTimer(timerId) {
        return instance.delete(`timer/${timerId}`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    }
}

export const DIARY_API = {
    getDiaries() {
        return instance.get(`diary`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    getDiary(diaryId) {
        return instance.get(`diary/${diaryId}`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    saveDiary(diary) {
        return instance.post(`diary`, diary,{
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    deleteDiary(diaryId) {
        return instance.delete(`diary/${diaryId}`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    }
}

export const PRACTICE_API = {
    getPractices(isPublic= false) {
        return instance.get(`practice?isPublic=${isPublic}`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    getPractice(practiceId) {
        return instance.get(`practice/${practiceId}`, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    addPracticeToUser(practiceId) {
        return instance.put(`practice/${practiceId}`, {}, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    savePractice(practice) {
        return instance.post(`practice`, practice, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    updatePractice(practice) {
        return instance.put(`practice`, practice, {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
    deletePractice(practiceId) {
        return instance.delete(`practice/${practiceId}`,  {
            headers : {
                "Authorization": `Bearer ${cookies.get("accessToken")}`
            }
        }).catch((error) => {
            return handleError(error)
        })
    },
}

const handleError = (error) => {
    if (error.response && error.response.status === 403) {
        return error.response
    } else {
        console.error(error)
    }
}