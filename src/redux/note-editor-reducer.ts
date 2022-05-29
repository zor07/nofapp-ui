import {NOTE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {PrimitiveSelection, RemirrorJSON} from "remirror";
import {currentDateString} from "../utils/dateUtils";
import {refreshToken} from "./auth-reducer";

export type NoteType = {
    id: string | null
    title: string
    notebookDto: {
    }
    data: NoteState
}

export type NoteState = {
    content: RemirrorJSON,
    selection: PrimitiveSelection | null | undefined
}

type InitialStateType = {
    note: NoteType | null
};

type UnmountNoteActionType = {
    type: typeof UNMOUNT_NOTE
}

type SetNoteActionType = {
    type: typeof SET_NOTE
    payload: NoteType
}

const SET_NOTE = 'NOTE/SET_NOTE'
const UNMOUNT_NOTE = 'NOTE/UNMOUNT_NOTE'

export const DEFAULT_CONTENT = {
    type: "doc",
    content: [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": currentDateString()
                }
            ]
        }
    ]
}

const initialState: InitialStateType = {
    note: {
        id: null,
        title: "",
        notebookDto: null,
        data: {
            content: DEFAULT_CONTENT,
            selection: {
                anchor: 0,
                head: 0
            }
        }
    }
}

const noteEditorReducer = (state: InitialStateType = initialState, action: UnmountNoteActionType | SetNoteActionType): InitialStateType => {
    switch (action.type) {
        case "NOTE/SET_NOTE":
            return {
                ...state,
                note: action.payload
            }
        case "NOTE/UNMOUNT_NOTE":
            return {
                ...state,
                note: initialState.note
            }
        default:
            return state
    }
}

const setNote = (payload: NoteType): SetNoteActionType => ({type: SET_NOTE, payload})
export const clearNoteAction = (): UnmountNoteActionType => ({type: UNMOUNT_NOTE})

export const getNote = (notebookId: string, noteId: string) => {
    return async (dispatch) => {
        const response = await NOTE_API.getNote(notebookId, noteId)
        if (response.status === 200) {
            const note: NoteType = response.data
            dispatch(setNote(note))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(getNote(notebookId, noteId))
        }
    }
}

export const saveNote = (notebookId: string, note: NoteType) => {
    return async (dispatch) => {
        const response = await NOTE_API.updateNote(notebookId, note)
        if (response.status === 202) {
            const newNote: NoteType = response.data
            dispatch(setNote(newNote))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(saveNote(notebookId, note))
        }
    }
}


export default noteEditorReducer