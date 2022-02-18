import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {clearDiaryAction, DiaryType, getDiary, saveDiary} from "../../redux/diary-reducer";
import {useNavigate, useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {PrimitiveSelection, RemirrorJSON} from "remirror";
import {Tabs} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Diary.module.css'
import {DiaryIdAndTitleType} from "../../redux/diaries-reducer";
import {compose} from "redux";


type MapStatePropsType = {
    diary: DiaryType | null,
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    saveDiary: (diary: DiaryType) => void
    getDiary: (diaryId: string) => void
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
        }
    }, [diary])


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

    useEffect(() => {
        if (currentDiaryId != params.diaryId) {
            dispatch(getDiary(currentDiaryId));
            navigate(`/diary/editor/${currentDiaryId}`)
        }
    }, [currentDiaryId])

    const handleTabChange = (selectedDiaryId) => {
        setCurrentDiaryId(selectedDiaryId)
    }

    const { TabPane } = Tabs;

    return (
        <div>
            <Tabs defaultActiveKey={params.diaryId}
                  tabPosition={'right'}
                  onChange={handleTabChange}
                  style={{ height: "max-content"}}>
                {props.diaries.map(diaryItem => (
                    <TabPane tab={diaryItem.title}
                             key={diaryItem.id} >
                        <div  className={css.editor}>
                            <Editor selection={props.diary.data.selection}
                                    content={props.diary.data.content}
                                    saveContent={saveContent} />
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
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {saveDiary, getDiary})
)(DiaryEditorContainer);