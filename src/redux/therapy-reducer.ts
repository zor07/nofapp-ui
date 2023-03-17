// import {USER_PROGRESS_API, TASK_CONTENT_API, TASKS_API} from "../api/api";
// import {isTokenExpired} from "../api/apiUtils";
// import {refreshToken} from "./auth-reducer";
// import {TaskContentType} from "./task-content-list-reducer";
// import {AppDispatch} from "./redux-store";
// import {TaskType} from "./tasks-reducer";
//
// type InitialStateType = {
//     currentUserTask: TaskType
//     selectedUserTask: TaskType
//     taskContentList: Array<TaskContentType>
// };
//
// type SetTaskContentListActionType = {
//     type: typeof SET_TASK_CONTENT_LIST
//     payload: Array<TaskContentType>
// }
//
// type SetCurrentUserTaskActionType = {
//     type: typeof SET_CURRENT_USER_TASK
//     payload: TaskType
// }
//
// type SetSelectedUserTaskActionType = {
//     type: typeof SET_SELECTED_USER_TASK
//     payload: TaskType
// }
//
// const SET_TASK_CONTENT_LIST = 'THERAPY/SET_TASK_CONTENT_LIST'
// const SET_CURRENT_USER_TASK = 'THERAPY/SET_CURRENT_USER_TASK'
// const SET_SELECTED_USER_TASK = 'THERAPY/SET_SELECTED_USER_TASK'
//
// const initialState: InitialStateType = {
//     currentUserTask: null,
//     selectedUserTask: null,
//     taskContentList: []
// }
//
// const therapyReducer = (state: InitialStateType = initialState,
//                         action: SetTaskContentListActionType
//                             | SetCurrentUserTaskActionType
//                             | SetSelectedUserTaskActionType): InitialStateType => {
//     switch (action.type) {
//         case SET_TASK_CONTENT_LIST:
//             return {
//                 ...state,
//                 taskContentList: action.payload
//             }
//         case SET_CURRENT_USER_TASK:
//             return {
//                 ...state,
//                 currentUserTask: action.payload
//             }
//         case SET_SELECTED_USER_TASK:
//             return {
//                 ...state,
//                 selectedUserTask: action.payload
//             }
//         default:
//             return state;
//     }
// }
//
// const setTaskContentListActionCreator = (payload: Array<TaskContentType>): SetTaskContentListActionType => ({
//     type: SET_TASK_CONTENT_LIST,
//     payload
// })
//
// const setCurrentUserTaskActionCreator = (payload: TaskType): SetCurrentUserTaskActionType => ({
//     type: SET_CURRENT_USER_TASK,
//     payload
// })
//
// const setSelectedUserTaskActionCreator = (payload: TaskType): SetSelectedUserTaskActionType => ({
//     type: SET_SELECTED_USER_TASK,
//     payload
// })
//
// export const getNextTask = (task: TaskType) => {
//     return async (dispatch: AppDispatch) => {
//         const taskResponse = await TASKS_API.getNextTask(task)
//         if (taskResponse.status === 200) {
//             await dispatch(getTaskContentListForUser(taskResponse.data))
//             dispatch(setSelectedUserTaskActionCreator(taskResponse.data))
//         } else if (isTokenExpired(taskResponse)) {
//             dispatch(refreshToken())
//                 .then(() => dispatch(getNextTask(task)))
//         }
//     }
// }
//
// export const getPrevTask = (task: TaskType) => {
//     return async (dispatch: AppDispatch) => {
//         const taskResponse = await TASKS_API.getPrevTask(task)
//         if (taskResponse.status === 200) {
//             await dispatch(getTaskContentListForUser(taskResponse.data))
//             dispatch(setSelectedUserTaskActionCreator(taskResponse.data))
//         } else if (isTokenExpired(taskResponse)) {
//             dispatch(refreshToken())
//                 .then(() => dispatch(getPrevTask(task)))
//         }
//     }
// }
//
// export const getCurrentUserTask = () => {
//     return async (dispatch: AppDispatch) => {
//         const taskResponse = await USER_PROGRESS_API.getCurrentUserTask()
//         if (taskResponse.status === 200) {
//             await dispatch(getTaskContentListForUser(taskResponse.data))
//             dispatch(setCurrentUserTaskActionCreator(taskResponse.data))
//             dispatch(setSelectedUserTaskActionCreator(taskResponse.data))
//         } else if (isTokenExpired(taskResponse)) {
//             dispatch(refreshToken())
//                 .then(() => dispatch(getCurrentUserTask()))
//         }
//     }
// }
//
// export const getTaskContentListForUser = (task: TaskType) => {
//     return async (dispatch: AppDispatch) => {
//         const response = await TASK_CONTENT_API.getTaskContentList(task.level.id, task.id)
//         if (response.status === 200) {
//             const data = response.data.map(taskContent => {
//                 if (taskContent.fileUri) {
//                     taskContent.fileUri = `http://127.0.0.1:9000/${taskContent.fileUri}`
//                 }
//             })
//             dispatch(setTaskContentListActionCreator(response.data))
//         } else if (isTokenExpired(response)) {
//             dispatch(refreshToken())
//                 .then(() => dispatch(getTaskContentListForUser(task)))
//         }
//     }
// }
//
// export const finishCurrentTask = () => {
//     return async (dispatch: AppDispatch) => {
//         const response = await USER_PROGRESS_API.finishCurrentTask()
//         if (response.status === 201) {
//             await dispatch(getCurrentUserTask())
//         } else if (isTokenExpired(response)) {
//             dispatch(refreshToken())
//                 .then(() => dispatch(finishCurrentTask()))
//         }
//     }
// }
//
// export default therapyReducer