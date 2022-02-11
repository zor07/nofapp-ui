import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {clearDiaryAction, DiaryType, getDiary, saveDiary} from "../../redux/diary-reducer";
import {useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {PrimitiveSelection, RemirrorJSON} from "remirror";


type MapStatePropsType = {
    diary: DiaryType | null
}

type MapDispatchPropsType = {
    saveDiary: (diary: DiaryType) => void
    getDiary: (diaryId: string) => void
}


type DiaryContainerPropsType = MapStatePropsType & MapDispatchPropsType

const DiaryEditorContainer: React.FC<DiaryContainerPropsType> = (props) =>  {

    const params = useParams()
    const dispatch = useDispatch()
    const [diary, setDiary] = useState(props.diary)

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

    return (
        <div>
            <Editor selection={props.diary.data.selection} content={props.diary.data.content}
                    saveContent={saveContent} />
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diary: state.diary.diary
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {saveDiary, getDiary})(DiaryEditorContainer)