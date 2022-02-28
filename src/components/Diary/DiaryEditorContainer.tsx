import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {clearDiaryAction, DiaryType, getDiary, saveDiary} from "../../redux/diary-reducer";
import {useNavigate, useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {PrimitiveSelection, RemirrorJSON} from "remirror";
import {message, Tabs} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Diary.module.css'
import {DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {compose} from "redux";
import {useDebouncedCallback} from "use-debounce";


type MapStatePropsType = {
    diary: DiaryType | null,
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    saveDiary: (diary: DiaryType) => void
    getDiary: (diaryId: string) => void
    requestDiaries: () => void
}


type DiaryContainerPropsType = MapStatePropsType & MapDispatchPropsType

const DiaryEditorContainer: React.FC<DiaryContainerPropsType> = (props) =>  {

    const params = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [diary, setDiary] = useState(props.diary)
    const [currentDiaryId, setCurrentDiaryId] = useState(params.diaryId)

    useEffect(() => {
        if (params.diaryId) {
            dispatch(getDiary(params.diaryId));
        }
        return () => {dispatch(clearDiaryAction())}
    }, [dispatch])

    useEffect(() => {
        if (diary !== props.diary) {
            dispatch(saveDiary(diary))
            setTimeout(() => {
                // TODO describe types in reducers, and return promise from dispatch
                dispatch(requestDiaries())
            }, 250)
        }
    }, [diary])


    useEffect(() => {
        if (currentDiaryId != params.diaryId) {
            dispatch(getDiary(currentDiaryId));
            navigate(`/diary/editor/${currentDiaryId}`)
        }
    }, [currentDiaryId])

    const handleTabChange = (selectedDiaryId) => {
        debounced.cancel();
        setCurrentDiaryId(selectedDiaryId)
    }

    const { TabPane } = Tabs;

    const [editorState, setEditorState] = useState(null);
    const [shouldAutoSave, setShouldAutoSave] = useState(false)
    const [shouldSaveImmediately, setShouldSaveImmediately] = useState(false)

    const saveContent = (content: RemirrorJSON, selection: PrimitiveSelection, title: string) => {
        if (!title || title === '') {
            alert('Please add title!')
        } else {
            const newDiary = {
                id: params.diaryId,
                title: title,
                data: {
                    content, selection
                }
            }

            setDiary(newDiary)
        }
    }

    const save = (content: RemirrorJSON, selection: PrimitiveSelection, title: string) => {
        if (shouldAutoSave || shouldSaveImmediately) {
            saveContent(content, selection, title)
            message.info('Saved')
        }
    }
    const debounced = useDebouncedCallback(
        (document, selection, title, save) => {
            save(document, selection, title)
        },
        // delay in ms
        3000
    );

    // Manual save
    useEffect(() => {
        if (shouldSaveImmediately) {
            const currSelection =  getCurrSelection()
            const title = getTitle()
            if (title) {
                save(editorState.doc as unknown as RemirrorJSON, currSelection, title)
            } else {
                message.warn('Please add title', 1)
            }
            setShouldSaveImmediately(false)
            setShouldAutoSave(false)
            debounced.cancel()
        }
    }, [shouldSaveImmediately]);

    // Auto save
    useEffect(() => {
        if (shouldAutoSave) {
            const currSelection =  getCurrSelection()
            const title = getTitle()
            if (title) {
                debounced(editorState.doc, currSelection, title, save.bind(this));
            }
            setShouldAutoSave(false)
        }
    }, [shouldAutoSave]);

    const getTitle = (): string | undefined => {
        const titleNode = editorState.doc.nodeAt(1)
        if (titleNode && titleNode.text) {
            return titleNode.text
        } else return undefined
    }

    const getCurrSelection = (): PrimitiveSelection => {
        return {
            anchor: editorState.selection.anchor,
            head: editorState.selection.head
        }
    }

    return (
        <div>
            <Tabs defaultActiveKey={params.diaryId}
                  activeKey={params.diaryId}
                  tabPosition={'right'}
                  onChange={handleTabChange}
                  style={{ height: "max-content"}}>
                {props.diaries.map(diaryItem => (
                    <TabPane tab={diaryItem.title}
                             key={diaryItem.id} >
                        <div  className={css.editor}>
                            <Editor selection={props.diary.data.selection}
                                    content={props.diary.data.content}
                                    setEditorState={setEditorState}
                                    setShouldAutoSave={setShouldAutoSave}
                                    setShouldSaveImmediately={setShouldSaveImmediately}/>
                        </div>
                    </TabPane>
                ))}
            </Tabs>


        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diary: state.diary.diary,
        diaries: state.diaries.diaries
    }
}


export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {saveDiary, getDiary, requestDiaries})
)(DiaryEditorContainer);