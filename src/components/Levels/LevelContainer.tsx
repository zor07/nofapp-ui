import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Note.module.css'
import {LevelType} from "../../redux/levels-reducer";

type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {

}

type OwnPropsType = {}

type NotesListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelContainer: React.FC<NotesListContainerPropsType> = (props) => {

    return (
        <div className={css.content}>

        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        levels: state.levels.levels,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {})
)(LevelContainer);
