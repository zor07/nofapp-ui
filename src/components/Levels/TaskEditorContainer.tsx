import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {useNavigate, useParams} from "react-router-dom";
import {RemirrorJSON} from "remirror";
import {Col, message, PageHeader, Row} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useDebouncedCallback} from "use-debounce";
import Editor from "../Editor/Editor";
import css from './Levels.module.css'
import TaskContentVideoComponent from "./TaskVideoComponent";
import {saveTask, TaskType} from "../../redux/tasks-reducer";
import {requestTask, unmountTask, uploadVideo} from "../../redux/task-editor-reducer";


type MapStatePropsType = {
    task: TaskType | null
}

type MapDispatchPropsType = {
    saveTask: (levelId: string, task: TaskType) => void
    requestTask: (levelId: string, taskId: string) => void
    unmountTask: () => void
    uploadVideo: (levelId: string, taskId: string, file: File) => void
}


type TaskEditorContainerPropsType = MapStatePropsType & MapDispatchPropsType

const PracticeEditorContainer: React.FC<TaskEditorContainerPropsType> = ({task}) => {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [video, setVideo] = useState(null)
    const [shouldDeleteVideo, setShouldDeleteVideo] = useState(false)
    const [contentToUpdate, setContentToUpdate] = useState(null)
    const levelId = params.levelId
    const taskId = params.taskId

    useEffect(() => {
        if (levelId && taskId) {
            dispatch(requestTask(levelId, taskId)).then();
        }
        return () => {
            dispatch(unmountTask())
        }
    }, [dispatch])

    useEffect(() => {
        if (video) {
            dispatch(uploadVideo(levelId, taskId, video))
                .then(() => setVideo(null));
        }
    }, [video])

    useEffect(() => {
        if (shouldDeleteVideo) {
            //TODO implement
            setShouldDeleteVideo(false)
        }
    }, [shouldDeleteVideo])

    useEffect(() => {
        if (contentToUpdate) {
            const newTask: TaskType = {
                ...task,
                level: {
                    ...task.level
                },
                data: contentToUpdate
            }
            dispatch(saveTask(levelId, newTask))
                .then(() => setContentToUpdate(null))
        }
    }, [contentToUpdate])

    const onUploadVideo = (file: File) => {
        setVideo(file)
    }

    const onDeleteVideo = () => {
        setShouldDeleteVideo(true)
    }


    const [editorState, setEditorState] = useState(null);
    const [shouldAutoSave, setShouldAutoSave] = useState(false)
    const [shouldSaveImmediately, setShouldSaveImmediately] = useState(false)

    const saveContent = (content: RemirrorJSON, title: string) => {
        if (!title || title === '') {
            alert('Please add title!')
        } else {
            setContentToUpdate(content)
        }
    }

    const backToLevels = () => {
        navigate(`/config/levels`)
    }

    const save = (content: RemirrorJSON, title: string) => {
        if (shouldAutoSave || shouldSaveImmediately) {
            saveContent(content, title)
            message.info('Saved')
        }
    }
    const debounced = useDebouncedCallback(
        (document, title, save) => {
            save(document, title)
        },
        // delay in ms
        13000
    );

    // Manual save
    useEffect(() => {
        if (shouldSaveImmediately) {
            const name = getName()
            if (name) {
                save(editorState.doc as unknown as RemirrorJSON, name)
            } else {
                message.warn('Please add practice name', 1)
            }
            setShouldSaveImmediately(false)
            setShouldAutoSave(false)
            debounced.cancel()
        }
    }, [shouldSaveImmediately]);

    // Auto save
    useEffect(() => {
        if (shouldAutoSave) {
            const title = getName()
            if (title) {
                debounced(editorState.doc, title, save.bind(this));
            }
            setShouldAutoSave(false)
        }
    }, [shouldAutoSave]);

    const getName = (): string | undefined => {
        const titleNode = editorState.doc.nodeAt(1)
        if (titleNode && titleNode.text) {
            return titleNode.text
        } else return undefined
    }

    return (
        <div className={css.content}>
            <PageHeader
                ghost={false}
                title={task && task.level ? `${task.name}` : `Task`}
                subTitle={task && task.level ? `${task.level.name}` : `Level`}
                onBack={() => backToLevels()}>

            </PageHeader>
            {task
                ? <div>
                    <Row>
                        <Col span={24}>
                            <Editor selection={{anchor: 0, head: 0}}
                                    content={task.data}
                                    setEditorState={setEditorState}
                                    setShouldAutoSave={setShouldAutoSave}
                                    setShouldSaveImmediately={setShouldSaveImmediately}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TaskContentVideoComponent task={task}
                                                       onDeleteVideo={onDeleteVideo}
                                                       onUploadVideo={onUploadVideo} />
                        </Col>
                    </Row>
                </div>
                : <div>Loading...</div>
            }
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        task: state.taskEditor.task,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestTask,
        saveTask,
        unmountTask,
        uploadVideo
    })
)(PracticeEditorContainer);