import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Button, List, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Typography} from 'antd';
import css from './Note.module.css'
import {
    clearCreatedNoteId,
    createNewNote,
    deleteNote,
    NoteIdAndTitleType,
    requestNotes
} from "../../redux/notes-reducer";

type MapStatePropsType = {
    notes: Array<NoteIdAndTitleType>
    createdNoteId: string | null
}

type MapDispatchPropsType = {
    requestNotes: (notebookId: string) => void
    deleteNote: (notebookId: string, noteId: string) => void
    createNewNote: (notebookId: string) => void
    clearCreatedNoteId: () => void
}

type OwnPropsType = {}

type NotesListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const NoteListContainer: React.FC<NotesListContainerPropsType> = (props) => {
    const {Title} = Typography;
    const params = useParams()
    const [deleteNoteId, setDeleteNoteId] = useState('')
    const [isCreatingNewNoteId, setIsCreatingNewNoteId] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.notebookId) {
            dispatch(requestNotes(params.notebookId))
        }
    }, [])

    useEffect(() => {
        dispatch(requestNotes(params.notebookId))
        if (props.createdNoteId) {
            setIsCreatingNewNoteId(false)
            const newId = props.createdNoteId
            dispatch(clearCreatedNoteId())
            navigate(`/notebooks/${params.notebookId}/notes/${newId}`)
        }
    }, [props.createdNoteId])

    useEffect(() => {
        if (deleteNoteId !== '') {
            dispatch(deleteNote(params.notebookId, deleteNoteId))
            setDeleteNoteId('')
        }
    }, [deleteNoteId])

    useEffect(() => {
        if (isCreatingNewNoteId) {
            dispatch(createNewNote(params.notebookId))
        }
    }, [isCreatingNewNoteId])

    const onCreateNewNote= () => {
        setIsCreatingNewNoteId(true)
    }

    const onDeleteNote = (noteId: string) => {
        setDeleteNoteId(noteId)
    }

    return (
        <div className={css.content}>
            <Title level={3}>Note</Title>
            <List itemLayout="vertical"
                  size="large"
                  pagination={{
                      onChange: page => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  footer={
                      <div>
                          <Button loading={isCreatingNewNoteId}
                                  type="primary"
                                  onClick={onCreateNewNote}>
                              New note
                          </Button>
                      </div>
                  }
                  dataSource={props.notes}
                  renderItem={item => (
                      <List.Item key={item.id}
                                 actions={[
                                     <NavLink to={`/notebooks/${params.notebookId}/notes/${item.id}`}>
                                         <Button icon={<EditOutlined/>}>Edit</Button>
                                     </NavLink>,

                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${item.title}] ?`}
                                                 onConfirm={() => onDeleteNote(item.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>

                                 ]}>
                          <Title level={5}>{item.title}</Title>
                      </List.Item>
                  )}/>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        notes: state.notes.notes,
        createdNoteId: state.notes.createdNoteId
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestNotes, deleteNote, createNewNote, clearCreatedNoteId})
)(NoteListContainer);
