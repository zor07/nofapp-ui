import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import Diaries from "./Diaries";
import DiaryContainer from "./DiaryContainer";


type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    requestDiaries: () => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class DiariesContainer extends React.Component<DiariesContainerPropsType> {

    componentDidMount() {
        this.props.requestDiaries()
    }

    render() {
        if (this.props.diaries.length > 0) {
            return <Diaries diaries={this.props.diaries} />
        } else {
            return <DiaryContainer diary={null} timerPage={undefined} auth={undefined} app={undefined} diaries={undefined}/>
        }
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diaries: state.diaries.diaries
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries})(DiariesContainer);