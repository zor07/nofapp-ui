import axios from "axios";
import Cookies from "universal-cookie";
import {ProfileType, RelapseLog} from "../redux/profile-reducer";
import {NoteType} from "../redux/note-editor-reducer";
import {LevelType} from "../redux/levels-reducer";
import {TaskType} from "../redux/tasks-reducer";
import {UserProgressType} from "../redux/user-progress-reducer";

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
    register(username, name, password) {
        return instance.post(`auth/register`, {username, name, password})
    },
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

export const LEVELS_API = {
    getLevels(): PromiseLike<ResponseType<Array<LevelType>>> {
        return instance.get(`/levels`, auth()).catch((error) => {
            return handleError(error)
        })
    },
    createLevel(level: LevelType): PromiseLike<ResponseType<LevelType>> {
        return instance.post(`/levels`, level, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateLevel(level: LevelType): PromiseLike<ResponseType<LevelType>> {
        return instance.put(`/levels/${level.id}`, level, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteLevel(levelId: string): PromiseLike<ResponseType<any>> {
        return instance.delete(`/levels/${levelId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const TASKS_API = {
    getLevelTasks(levelId: string): PromiseLike<ResponseType<Array<TaskType>>> {
        return instance.get(`/levels/${levelId}/tasks`, auth()).catch((error) => {
            return handleError(error)
        })
    },
    getLevelTask(levelId: string, taskId: string): PromiseLike<ResponseType<TaskType>> {
        return instance.get(`/levels/${levelId}/tasks/${taskId}`, auth()).catch((error) => {
            return handleError(error)
        })
    },
    getNextTask(task: TaskType): PromiseLike<ResponseType<TaskType>> {
        return instance.get(`/levels/${task.level.id}/tasks/${task.id}/next`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getPrevTask(task: TaskType): PromiseLike<ResponseType<TaskType>> {
        return instance.get(`/levels/${task.level.id}/tasks/${task.id}/prev`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    createLevelTask(levelId: string, task: TaskType): PromiseLike<ResponseType<TaskType>> {
        return instance.post(`/levels/${levelId}/tasks`, task, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    updateLevelTask(levelId: string, taskId: string, task: TaskType): PromiseLike<ResponseType<TaskType>> {
        return instance.put(`/levels/${levelId}/tasks/${taskId}`, task, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    uploadMediaToTask(
        levelId: string,
        taskId: string,
        file: File
    ): PromiseLike<ResponseType<any>> {
        const formData = new FormData();
        formData.append('file', file)
        const config = auth()
        config.headers["content-type"] = "multipart/form-data"

        return instance.post(`/levels/${levelId}/tasks/${taskId}/video`, formData, config)
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteMediaFromTask(levelId: string, taskId: string): PromiseLike<ResponseType<any>> {
        return instance.delete(`/levels/${levelId}/tasks/${taskId}/video`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteTask(levelId: string, taskId: string): PromiseLike<ResponseType<any>> {
        return instance.delete(`/levels/${levelId}/tasks/${taskId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const USER_PROGRESS_API = {

    fetchUserProgress(): PromiseLike<ResponseType<UserProgressType>> {
        return instance.get<UserProgressType>(`progress`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    finishCurrentTask(): PromiseLike<ResponseType<any>> {
        return instance.put(`progress/finishCurrentTask`, null, auth())
            .catch((error) => {
                return handleError(error)
            })
    }

}

export const PROFILE_API = {
    getProfiles(): PromiseLike<ResponseType<Array<ProfileType>>> {
        return instance.get<Array<ProfileType>>(`profiles`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    getProfile(userId: string): PromiseLike<ResponseType<ProfileType>> {
        return instance.get<ProfileType>(`profiles/${userId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    uploadAvatar(userId: string, avatar: File): PromiseLike<ResponseType<any>> {
        const formData = new FormData();
        formData.append('file', avatar)
        const config = auth()
        config.headers["content-type"] = "multipart/form-data"

        return instance.post(`profiles/${userId}/avatar`, formData, config)
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteAvatar(userId: string): PromiseLike<ResponseType<any>> {
        return instance.delete(`profiles/${userId}/avatar`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
}

export const USER_POSTS_API = {
    getUserPosts(userId: string): PromiseLike<ResponseType<Array<NoteType>>> {
        return instance.get(`profiles/${userId}/posts`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    addPostToUser(userId: string, noteId: string): PromiseLike<ResponseType<any>> {
        return instance.post(`profiles/${userId}/posts/${noteId}`, {}, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteUserPost(userId: string, noteId: string): PromiseLike<ResponseType<any>> {
        return instance.delete(`profiles/${userId}/posts/${noteId}`, auth())
            .catch((error) => {
                return handleError(error)
            })
    }
}

export const RELAPSE_LOG_API = {
    getRelapseLogEntries(userId: string): PromiseLike<ResponseType<Array<RelapseLog>>> {
        return instance.get(`profiles/${userId}/relapses`, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    relapsed(userId: string): PromiseLike<ResponseType<ProfileType>> {
        return instance.post<ProfileType>(`profiles/${userId}/relapsed`, {}, auth())
            .catch((error) => {
                return handleError(error)
            })
    },
    deleteRelapseLogEntry(userId: string, relapseLogId: string) {
        return instance.delete(`profiles/${userId}/relapses/${relapseLogId}`, auth())
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