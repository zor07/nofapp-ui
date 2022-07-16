export type ProfileType = {
    id: string | null
    avatarUri: string | null
    timerStart: Date
    userId: string
}

type InitialStateType =  {
    profile: ProfileType
};

type SetProfileActionType = {
    type: typeof SET_PROFILE
    payload: ProfileType
}

const SET_PROFILE = 'PROFILE/SET_PROFILE'

const initialState: InitialStateType = {
    profile: {
        id: "some id",
        userId: "user id",
        avatarUri: "avatar url",
        timerStart: new Date("2021-11-08T01:00:00.000")
    }
}

const profileReducer = (state: InitialStateType = initialState, action: SetProfileActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET_PROFILE":
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer