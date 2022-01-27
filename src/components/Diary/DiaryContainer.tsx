import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DiaryType, getDiary, saveDiary} from "../../redux/diary-reducer";
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

const DiaryContainer: React.FC<DiaryContainerPropsType> = (props) =>  {

    const params = useParams()
    const dispatch = useDispatch()
    const [diary, setDiary] = useState(props.diary)

    useEffect(() => {
        if (params.diaryId) {
            dispatch(getDiary(params.diaryId));
        }
    }, [dispatch])

    useEffect(() => {
        if (diary !== props.diary) {
            dispatch(saveDiary(diary))
        }
    }, [diary])


    const saveContent = (content: RemirrorJSON) => {
        const newDiary = {
            id: params.diaryId,
            title: content.content[0].content[0].text,
            data: content
        }

        setDiary(newDiary)
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

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {saveDiary, getDiary})(DiaryContainer)