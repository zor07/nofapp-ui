import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {NavLink} from "react-router-dom";
import css from './Diary.module.css'

type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    requestDiaries: () => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DiaryListContainer: React.FC<DiariesContainerPropsType> = (props) => {

    useEffect(() => {
        props.requestDiaries()
    }, [])

    const notes = props.diaries.map(diary =>
        <li key={diary.id}>
            <NavLink to={`/diary/editor/${diary.id}`}>
                {diary.title}
            </NavLink>


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

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries})(DiaryListContainer);