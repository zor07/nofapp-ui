import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../../../redux/redux-store";
import {useNavigate, useParams} from "react-router-dom";
import {RemirrorJSON} from "remirror";
import {Button, Descriptions, message, PageHeader} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useDebouncedCallback} from "use-debounce";
import {TaskContentType} from "../../../../redux/task-content-list-reducer";
import {requestTaskContent, unmountTaskContent, updateTaskContent} from "../../../../redux/task-content-reducer";
import Editor from "../../../Editor/Editor";


type MapStatePropsType = {
    taskContent: TaskContentType | null
}

type MapDispatchPropsType = {
    updateTaskContent: (levelId: string, taskId: string, taskContentId: string, taskContent: TaskContentType) => void
    requestTaskContent: (levelId: string, taskId: string, taskContentId: string) => void
    unmountTaskContent: () => void
}


type TaskContentEditorContainerPropsType = MapStatePropsType & MapDispatchPropsType

const PracticeEditorContainer: React.FC<TaskContentEditorContainerPropsType> = ({taskContent}) => {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [contentToUpdate, setContentToUpdate] = useState(null)
    const levelId = params.levelId
    const taskId = params.taskId
    const taskContentId = params.taskContentId

    useEffect(() => {
        if (taskContentId) {
            dispatch(requestTaskContent(levelId, taskId, taskContentId)).then();
        }
        return () => {
            dispatch(unmountTaskContent())
        }
    }, [dispatch])

    useEffect(() => {
        if (contentToUpdate) {
            const newTaskContent: TaskContentType = {
                ...taskContent,
                task: {
                    ...taskContent.task,
                    level: {
                        ...taskContent.task.level
                    }
                },
                data: contentToUpdate
            }
            dispatch(updateTaskContent(levelId, taskId, taskContentId, newTaskContent))
                .then(() => setContentToUpdate(null))
        }
    }, [contentToUpdate])


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

    const backToTaskList = () => {
        navigate(`/config/levels/${levelId}/tasks/${taskId}/content`)
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
        <div>
            <PageHeader
                ghost={false}
                title={`Task content`}>
                <Descriptions size="small" column={1}>
                    <Descriptions.Item>
                        <Button onClick={() => backToTaskList()} icon={<ArrowLeftOutlined />}>Go back </Button>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            {taskContent
                ? <div>
                    <Editor selection={{anchor: 0, head: 0}}
                            content={taskContent.data}
                            setEditorState={setEditorState}
                            setShouldAutoSave={setShouldAutoSave}
                            setShouldSaveImmediately={setShouldSaveImmediately}/>
                    <div>
                        <span>Video:</span>
                        {taskContent.fileUri}
                    </div>
                </div>
                : <div>Loading...</div>
            }
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        taskContent: state.taskContent.taskContent,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestTaskContent,
        updateTaskContent,
        unmountTaskContent
    })
)(PracticeEditorContainer);