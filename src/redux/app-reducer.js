import {me} from "./auth-reducer.ts";

const SET_INITIALIZED = 'APP/SET_INITIALIZED'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const setInitialized = () => ({type: SET_INITIALIZED})

export const initializeApp = () => (dispatch) => {
    const promise = dispatch(me());

    Promise.all([promise])
        .then(() => dispatch(setInitialized()))
}

export default appReducer