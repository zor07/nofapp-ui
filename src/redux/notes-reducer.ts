import {NOTE_API} from "../api/api";
import {isTokenExpired} from "../api/apiUtils";
import {refreshToken} from "./auth-reducer";
import {NoteType, DEFAULT_CONTENT} from "./note-editor-reducer";
import {currentDateString} from "../utils/dateUtils";

export type NoteIdAndTitleType = {
    id: string
    title: string
}

type SetNotesActionType = {
    type: typeof SET_NOTES
    payload: Array<NoteIdAndTitleType>
}

type SetCreatedNoteIdActionType = {
    type: typeof SET_CREATED_NOTE_ID
    payload: string
}

type NotesStateType = {
    notes: Array<NoteIdAndTitleType>
    createdNoteId: string | null
}

const SET_NOTES = 'NOTES/SET_NOTES'
const SET_CREATED_NOTE_ID =  'NOTES/SET_CREATED_NOTE_ID'

const initialState: NotesStateType = {
    notes: [],
    createdNoteId: null
}

const notesReducer = (state: NotesStateType = initialState, action: SetNotesActionType | SetCreatedNoteIdActionType): NotesStateType => {
    switch (action.type) {
        case "NOTES/SET_NOTES":
            return {
                ...state,
                notes: action.payload
            }
        case "NOTES/SET_CREATED_NOTE_ID":
            return {
                ...state,
                createdNoteId: action.payload
            }
        default:
            return state
    }
}

const setNotes = (payload: Array<NoteIdAndTitleType>): SetNotesActionType => ({type: SET_NOTES, payload})
const setCreatedNoteId = (payload: string): SetCreatedNoteIdActionType => ({type: SET_CREATED_NOTE_ID, payload})

export const deleteNote = (notebookId: string, noteId: string) => {
    return async (dispatch) => {
        const response = await NOTE_API.deleteNote(notebookId, noteId);
        if (response.status === 204) {
            dispatch(requestNotes(notebookId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(deleteNote(notebookId, noteId))
        }
    }
}

export const requestNotes = (notebookId: string) => {
    return async (dispatch) => {
        const response = await NOTE_API.getNotes(notebookId);
        if (response.status === 200) {
            const notes: Array<NoteIdAndTitleType> = response.data
            dispatch(setNotes(notes))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(requestNotes(notebookId))
        }
    }
}

export const createNewNote = (notebookId: string) => {
    return async (dispatch) => {
        const note: NoteType = {
            id: null,
            title: currentDateString(),
            notebookDto: {
                id: notebookId
            },
            data: {
                content: DEFAULT_CONTENT,
                selection: {anchor: 0, head: 0}
            }
        }
        const response = await NOTE_API.createNote(notebookId, note);
        if (response.status === 201) {
            const newNoteId: string = response.data.id
            dispatch(setCreatedNoteId(newNoteId))
        } else if (isTokenExpired(response)) {
            dispatch(refreshToken())
            dispatch(createNewNote(notebookId))
        }
    }
}

export const clearCreatedNoteId = () => {
    return async (dispatch) => {
        dispatch(setCreatedNoteId(null))
    }
}

export default notesReducer