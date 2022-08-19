import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {useNavigate, useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {RemirrorJSON} from "remirror";
import {Button, Descriptions, message, PageHeader, Tag} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {useDebouncedCallback} from "use-debounce";
import {clearPracticeAction, getPractice, PracticeType, savePractice} from "../../redux/practice-reducer";


type MapStatePropsType = {
    practice: PracticeType | null
}

type MapDispatchPropsType = {
    savePractice: (practice: PracticeType) => void
    getPractice: (practiceId: string) => void
}


type PracticeEditorContainerPropsType = MapStatePropsType & MapDispatchPropsType

const PracticeEditorContainer: React.FC<PracticeEditorContainerPropsType> = (props) =>  {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [practice, setPractice] = useState(props.practice)
    const [currentPracticeId, setCurrentPracticeId] = useState(params.practiceId)

    useEffect(() => {
        if (params.practiceId) {
            dispatch(getPractice(params.practiceId));
        }
        return () => {dispatch(clearPracticeAction())}
    }, [dispatch])

    useEffect(() => {
        if (practice !== props.practice) {
            dispatch(savePractice(practice))
        }
    }, [practice])


    useEffect(() => {
        if (currentPracticeId != params.practiceId) {
            dispatch(getPractice(currentPracticeId));
            navigate(`/practice/editor/${currentPracticeId}`)
        }
    }, [currentPracticeId])

    const [editorState, setEditorState] = useState(null);
    const [shouldAutoSave, setShouldAutoSave] = useState(false)
    const [shouldSaveImmediately, setShouldSaveImmediately] = useState(false)

    const saveContent = (content: RemirrorJSON, title: string) => {
        if (!title || title === '') {
            alert('Please add title!')
        } else {
            const newPractice = {
                id: params.practiceId,
                name: title,
                practiceTag: {
                    id: 1,
                    name: 'test'
                },
                description: 'some description', // TODO parse description
                data: content,
                isPublic: true // TODO handle public
            }

            setPractice(newPractice)
        }
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

    const goToPublicPracticeList = () => {
        navigate('/practices')
    }

    const goToMyPracticeList = () => {
        navigate('/my-practices')
    }

    return (
        <div>
            <PageHeader
                ghost={false}
                title={'Edit practice'}>
                <Descriptions size="small" column={1}>
                    <Descriptions.Item label="Tags">
                        <Tag color="green">Tag 1</Tag>
                        <Tag color="orange">Tag 2</Tag>
                        <Tag color="blue">Tag 3</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Go to:">
                        <Button onClick={() => goToPublicPracticeList()}>Public Practices</Button>
                        <Button onClick={() => goToMyPracticeList()}>My Practices</Button>
                    </Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <Editor selection={{anchor: 0, head: 0}}
                    content={props.practice.data}
                    setEditorState={setEditorState}
                    setShouldAutoSave={setShouldAutoSave}
                    setShouldSaveImmediately={setShouldSaveImmediately}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        practice: state.practice.practice
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {savePractice, getPractice})
)(PracticeEditorContainer);