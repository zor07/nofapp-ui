import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import Diary from "./Diary";
import {DiaryType, saveDiary} from "../../redux/diary-reducer";


type MapStatePropsType = {
    diary: DiaryType | null
}

type MapDispatchPropsType = {
    saveDiary: (diary: DiaryType) => void
}

type OwnPropsType = {}

type DiaryContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DiaryContainer extends React.Component<DiaryContainerPropsType> {
    render() {
        return <Diary diary={this.props.diary}
                      saveDiary={this.props.saveDiary}/>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diary: state.diary.diary
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {saveDiary})(DiaryContainer);