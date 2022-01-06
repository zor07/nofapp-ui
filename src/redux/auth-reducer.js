
const initialState = {

}

const authReducer = (state = initialState, action) => {
    return initialState;
}


export const login = (email, password) => {
    return (dispatch) => {
        alert(email + ' ' + password)
    }
}


export default authReducer;