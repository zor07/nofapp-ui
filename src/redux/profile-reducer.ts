import {RemirrorJSON} from "remirror";

export type ProfileType = {
    id: string | null
    avatarUri: string | null
    timerStart: Date
    user: {
        id: string
        name: string
        username: string
    }
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
        user: {
            id: "user id",
            name: "user name",
            username: "username"
        },
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
                            text: "Some post 1"
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "text text text"
                        }
                    ]
                }
            ]
        },
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
                            text: "Some post 2"
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: "text text text"
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
        case "PROFILE/SET_POSTS":
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer