import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {connect, useDispatch} from "react-redux";
import {getPractice, PracticeType} from "../../redux/practice-reducer";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import EditorStatic from "./EditorStatic";


type MapStatePropsType = {
    practice: PracticeType
}

type MapDispatchPropsType = {
    getPractice: (practiceId: string) => void
}

type OwnPropsType = {
}

type PracticeContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const PracticeContainer: React.FC<PracticeContainerPropsType> = (props: PracticeContainerPropsType) => {

    const practice = props.practice
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.practiceId) {
            dispatch(getPractice(params.practiceId));
        }
    }, [])

    return (
        <div>
            <div>{practice.id}</div>
            <div><EditorStatic content={practice.data}/></div>
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