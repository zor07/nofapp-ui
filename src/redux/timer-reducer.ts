import {TIMER_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {adjustForTimezone, getCurrentDate} from "../utils/dateUtils";

const SET_TIMERS = 'TIMER/SET_TIMERS'
const START_TIMER = 'TIMER/START_TIMER'

type Action = {
    type: typeof SET_TIMERS | typeof START_TIMER,
    payload: Array<Timer>
}

type TimerState =  {
    timers: Array<Timer>
};

type TimerFormData = {
    start?: string,
    fromNow: boolean,
    description: string
}

type TimerDto = {
    id: string,
    isRunning: boolean,
    start: string,
    stop?: string | null,
    description: string
}

type Timer = {
    id: string,
    isRunning: boolean,
    start: Date,
    stop?: Date | null,
    description: string
}

const initialState: TimerState = {
    timers: [
        {
            id: "1",
            isRunning: true,
            start: new Date("2021-11-08T01:00:00.000"),
            stop: null,
            description: "Default timer. Start your server."
        }
    ]
}

const timerReducer = (state: TimerState = initialState, action: Action) => {
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

const setTimers = (payload: Array<Timer>) => ({type: SET_TIMERS, payload})
export const start = () => ({type: START_TIMER})
export const stop = () => ({type: START_TIMER})



export const startTimer = (timerData: TimerFormData) => {
    return async (dispatch: Function) => {

        const timerDto = {
            description: timerData.description,
            start: timerData.fromNow ? getCurrentDate(): adjustForTimezone(timerData.start)
        }

        const response = await TIMER_API.startTimer(timerDto)
        if (response.status === 201) {
            dispatch(requestTimers())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(startTimer(timerData))
        }
    }
}

export const stopTimer = (timerId: number) => {
    return async (dispatch: Function) => {
        const response = await TIMER_API.stopTimer(timerId)
        if (response.status === 202) {
            dispatch(requestTimers())
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(stopTimer(timerId))
        }
    }
}

export const deleteTimer = (timerId: number) => {
    return async (dispatch: Function) => {
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
    return async (dispatch: Function) => {
        const response = await TIMER_API.getTimers()
        if (response.status === 200) {

            const timersResp: Array<TimerDto> = response.data
            const timers = timersResp.map(timer => {
                return <Timer>{
                    id: timer.id,
                    isRunning: true,
                    start: new Date(Date.parse(timer.start)),
                    stop: timer.stop ? Date.parse(timer.stop) : null,
                    description: timer.description
                };
            })

            dispatch(setTimers(timers))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestTimers())
        }
    }
}


export default timerReducer;