import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {clearDiaryAction, DiaryType, getDiary, saveDiary} from "../../redux/diary-reducer";
import {useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import {RemirrorJSON} from "remirror";


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
            // alert('Saved!')
        }
    }, [diary])


    const saveContent = (content: RemirrorJSON) => {
        if (!content.content[0].content) {
            alert('Please add title!')
        } else {
            const newDiary = {
                id: params.diaryId,
                title: content.content[0].content[0].text,
                data: content
            }

            setDiary(newDiary)
        }
    }

    return (
        <div>
            <Editor content={props.diary.data}
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