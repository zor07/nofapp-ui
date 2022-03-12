import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect, useDispatch} from "react-redux";
import {getPractice, PracticeType} from "../../redux/practice-reducer";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {message} from "antd";


type MapStatePropsType = {
    practice: PracticeType
}

type MapDispatchPropsType = {
    getPractice: (practiceId: string) => void
}

type OwnPropsType = {
}

type PracticeContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const PracticeContainer: React.FC<PracticeContainerPropsType> = (props) => {

    const params = useParams()
    const dispatch = useDispatch()
    const [practice, setPractice] = useState(props.practice)
    const [currentPracticeId, setCurrentPracticeId] = useState(params.practiceId)

    useEffect(() => {
        message.info('load')
        if (params.practiceId) {
            dispatch(getPractice(params.practiceId));
        }
    }, [])

    return (
        <div>
            <div>{practice.id}</div>
            {/*<div>{practice.data}</div>*/}
            <div>{practice.description}</div>
            <div>{practice.name}</div>
            <div>{practice.isPublic ? 'true' : 'false'}</div>
        </div>
    )

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        practice: state.practice.practice
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {getPractice})
)(PracticeContainer);