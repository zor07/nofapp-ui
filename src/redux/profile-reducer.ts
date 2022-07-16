import {RemirrorJSON} from "remirror";

export type ProfileType = {
    id: string | null
    avatarUri: string | null
    timerStart: Date
    userId: string
}

type InitialStateType =  {
    profile: ProfileType
    posts: Array<RemirrorJSON>
};

type SetProfileActionType = {
    type: typeof SET_PROFILE
    payload: ProfileType
}

type SetPostsActionType = {
    type: typeof SET_POSTS
    payload: Array<RemirrorJSON>
}

const SET_POSTS = 'PROFILE/SET_POSTS'
const SET_PROFILE = 'PROFILE/SET_PROFILE'

const initialState: InitialStateType = {
    profile: {
        id: "some id",
        userId: "user id",
        avatarUri: "avatar url",
        timerStart: new Date("2021-11-08T01:00:00.000"),
    },
    posts: [
        {
            type: "doc",
            content: [
                {
                    type: "heading",
                    attrs: {
                        "level": 1
                    },
                    content: [
                        {
                            type: "text",
                            text: "Some post"
                        }
                    ]
                }
            ]
        }
    ]
}

const profileReducer = (state: InitialStateType = initialState,
                        action: SetProfileActionType | SetPostsActionType): InitialStateType => {
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