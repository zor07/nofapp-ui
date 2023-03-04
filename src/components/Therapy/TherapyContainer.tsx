import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Therapy.module.css'
import {TaskContentType} from "../../redux/task-content-list-reducer";
import {getTaskContentListForUser, nextTask} from "../../redux/therapy-reducer";
import Therapy from "./Therapy";


type MapStatePropsType = {
    taskContentList: Array<TaskContentType>
}

type MapDispatchPropsType = {
    getTaskContentListForUser: () => void
    nextTask: () => void
}

type OwnPropsType = {}

type TherapyContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const TherapyContainer: React.FC<TherapyContainerPropsType> = ({taskContentList}) => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getTaskContentListForUser()).then()
    }, [])

    taskContentList.sort((a, b) => a.order - b.order)

    return (
        <div className={css.content}>
            <Therapy taskContentList={taskContentList}/>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        taskContentList: state.therapy.taskContentList,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        getTaskContentListForUser, nextTask
    })
)(TherapyContainer);
