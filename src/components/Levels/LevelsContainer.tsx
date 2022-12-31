import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Levels.module.css'
import {LevelType} from "../../redux/levels-reducer";

type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {

}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = (props) => {

    return (
        <div className={css.content}>
            levels
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
)(LevelsContainer);
