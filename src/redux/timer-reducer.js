const STOP_TIMER = 'STOP_TIMER';
const START_TIMER = 'START_TIMER';

const initialState = {
    timers: [
        {
            id: 1,
            start: new Date("2021-11-02T01:00:00.000"),
            stop: null,
            description: ""
        }
    ]
};

const timerReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export const start = () => ({ type: START_TIMER})
export const stop = () => ({ type: START_TIMER})


export default timerReducer;