import axios from "axios";
import Cookies from "universal-cookie";
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV.toString()
})

const cookies = new Cookies()

export type ErrorResponse = {
    error_message: string | null
}

export type ResponseType<T> = {
    status: number
    data: T
} & ErrorResponse

export const AUTH_API = {
    login(username, password) {
        return instance.post(`auth/login`, {username, password})
    },
    me() {
        return instance.get(`auth/me`, auth()).catch((error) => {
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

export const PROFILE_API = {
    getProfiles() : PromiseLike<ResponseType<Array<ProfileType>>> {
        return instance.get<Array<ProfileType>>(`profiles`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getProfile(userId: string) : PromiseLike<ResponseType<ProfileType>> {
        return instance.get<ProfileType>(`profiles/${userId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    uploadAvatar(userId: string, avatar: File) : PromiseLike<ResponseType<any>> {
        const formData = new FormData();
        formData.append('file', avatar)
        const config = auth()
        config.headers["content-type"] = "multipart/form-data"

        return instance.post(`profiles/${userId}/avatar`, formData, config)
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteAvatar(userId: string) : PromiseLike<ResponseType<any>> {
        return instance.delete(`profiles/${userId}/avatar`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    relapsed(userId: string) : PromiseLike<ResponseType<ProfileType>> {
        return instance.post<ProfileType>(`profiles/${userId}/relapsed`, {}, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const TIMER_API = {
    getTimers() {
        return instance.get(`timers`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    startTimer(timerData) {
        return instance.post(`timers`, timerData, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    stopTimer(timerId) {
        return instance.put(`timers/${timerId}/stop`, null, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteTimer(timerId) {
        return instance.delete(`timers/${timerId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const NOTES_API = {
    getNotes(notebookId) {
        return instance.get(`notebooks/${notebookId}/notes`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getNote(notebookId, noteId) {
        return instance.get(`notebooks/${notebookId}/notes/${noteId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    createNote(notebookId, note) {
        return instance.post(`notebooks/${notebookId}/notes`, note, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateNote(notebookId, note) {
        return instance.put(`notebooks/${notebookId}/notes`, note, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteNote(notebookId, noteId) {
        return instance.delete(`notebooks/${notebookId}/notes/${noteId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}


export const NOTEBOOKS_API = {
    getNotebook(notebookId) {
        return instance.get(`notebooks/${notebookId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getNotebooks() {
        return instance.get('notebooks', auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    createNotebook(notebook) {
        return instance.post('notebooks', notebook, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateNotebook(notebook) {
        return instance.put('notebooks', notebook, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteNotebook(notebookId) {
        return instance.delete(`notebooks/${notebookId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const PRACTICE_API = {
    getPractices(isPublic = false) {
        return instance.get(`practices?isPublic=${isPublic}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getPractice(practiceId) {
        return instance.get(`practices/${practiceId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    addPracticeToUser(practiceId) {
        return instance.put(`practices/${practiceId}`, null, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    savePractice(practice) {
        return instance.post(`practices`, practice, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updatePractice(practice) {
        return instance.put(`practices`, practice, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deletePractice(practiceId) {
        return instance.delete(`practices/${practiceId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
}

const auth = () => {
    return getAuthConfig(cookies.get("accessToken"))
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