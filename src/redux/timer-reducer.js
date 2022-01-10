import {TIMER_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";

const SET_TIMERS = 'TIMER/SET_TIMERS'
const START_TIMER = 'TIMER/START_TIMER'

const initialState = {
    timers: [
        {
            id: 1,
            isRunning: true,
            start: new Date("2021-11-08T01:00:00.000"),
            stop: null,
            description: ""
        }
    ]
};

const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIMERS:
            return {
                ...state,
                timers: action.payload
            }
        case START_TIMER:
            return {
                ...state,

            }
        default:
            return state;
    }
}

const setTimers = (payload) => ({type: SET_TIMERS, payload})
export const start = () => ({type: START_TIMER})
export const stop = () => ({type: START_TIMER})


export const stopTimer = (timerId) => {
    return async (dispatch) => {
        const response = await TIMER_API.stopTimer(timerId)
        if (response.status === 202) {
            dispatch(requestTimers())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(stopTimer(timerId))
        }
    }
}

export const deleteTimer = (timerId) => {
    return async (dispatch) => {
        const response = await TIMER_API.deleteTimer(timerId)
        if (response.status === 204) {
            dispatch(requestTimers())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(deleteTimer(timerId))
        }
    }
}

export const requestTimers = () => {
    return async (dispatch) => {
        const response = await TIMER_API.getTimers()
        if (response.status === 200) {

            const timers = response.data.map(timer => {
                return {
                    id: timer.id,
                    isRunning: timer.isRunning,
                    start: timer.start ? Date.parse(timer.start) : null,
                    stop: timer.stop ? Date.parse(timer.stop) : null,
                    description: timer.description
                }
            })

            dispatch(setTimers(timers))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestTimers())
        }
    }
}


export default timerReducer;