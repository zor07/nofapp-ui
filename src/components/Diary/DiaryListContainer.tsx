import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {deleteDiary, DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {NavLink} from "react-router-dom";
import css from './Diary.module.css'
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    requestDiaries: () => void
    deleteDiary: (diaryId: string) => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DiaryListContainer: React.FC<DiariesContainerPropsType> = (props) => {

    const [deleteDiaryId, setDeleteDiaryId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestDiaries())
    }, [])


    useEffect(() => {
        if (deleteDiaryId !== '') {
            dispatch(deleteDiary(deleteDiaryId))
            setDeleteDiaryId('')
        }
    }, [deleteDiaryId])

    const notes = props.diaries.map(diary =>
        <li key={diary.id}>
            <NavLink to={`/diary/editor/${diary.id}`}>
                {diary.title}
            </NavLink>
            <div>
                <button onClick={() => setDeleteDiaryId(diary.id)}> Delete </button>
            </div>

        </li>);

    return (
        <div className={css.diaryList}>
            <h2>Diary</h2>
            <ul>
                {notes}
            </ul>
            <div>
                <NavLink to={`/diary/editor`}>
                    New note
                </NavLink>
            </div>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diaries: state.diaries.diaries
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries, deleteDiary})
)(DiaryListContainer);
