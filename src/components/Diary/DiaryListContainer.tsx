import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {NavLink} from "react-router-dom";


type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    requestDiaries: () => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DiaryListContainer extends React.Component<DiariesContainerPropsType> {

    componentDidMount() {
        this.props.requestDiaries()
    }

    render() {
        const elements = this.props.diaries.map(diary =>
            <li key={diary.id}>
                <NavLink to={`/diary/editor/${diary.id}`}>
                    {diary.title}
                </NavLink>
            </li>);


        return (
            <div>
                <ul>
                    {elements}
                </ul>
                <div>
                    <NavLink to={`/diary/editor`}>
                        New note
                    </NavLink>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diaries: state.diaries.diaries
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries})(DiaryListContainer);