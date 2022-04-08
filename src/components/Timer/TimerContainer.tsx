import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {deleteTimer, requestTimers, startTimer, stopTimer, TimerFormDataType, TimerType} from "../../redux/timer-reducer";
import TimerCard from "./TimerCard";
import {AppStateType} from "../../redux/redux-store";
import {Col, Divider, Row, Typography} from "antd";
import TimerForm from "./TimerForm";

const {Title} = Typography;

type MapStatePropsType = {
    timers: Array<TimerType>
}

type MapDispatchPropsType = {
    requestTimers: () => void
    startTimer: (timerData: TimerFormDataType) => void
    stopTimer: (timerId: string) => void
    deleteTimer: (timerId: string) => void
}

type OwnPropsType = {}

type TimerContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class TimerContainer extends React.Component<TimerContainerPropsType> {

    componentDidMount() {
        this.props.requestTimers();
    }

    render() {
        const timers = this.props.timers;
        const runningItems = timers
            ? timers.filter(timer => timer.isRunning)
                .map(timer => {
                    return (
                        <Col span={6} key={timer.id}>
                            <TimerCard key={timer.id}
                                       stopTimer={this.props.stopTimer}
                                       deleteTimer={this.props.deleteTimer}
                                       timer={timer}/>
                        </Col>
                    )
                })
            : null

        const stoppedItems = timers
            ? timers.filter(timer => !timer.isRunning)
                .map(timer => {
                    return (
                        <Col span={6} key={timer.id}>
                            <TimerCard key={timer.id}
                                       stopTimer={this.props.stopTimer}
                                       deleteTimer={this.props.deleteTimer}
                                       timer={timer}/>
                        </Col>
                    )
                })
            : null

        return (
            <div>
                <Title level={3}>Timers</Title>
                <Row justify="start">
                    {runningItems}
                </Row>

                {(stoppedItems.length > 0 && runningItems.length !== 0) &&
                <Divider/>
                }

                <Row justify="start">
                    {stoppedItems}
                </Row>

                {(stoppedItems.length > 0 || runningItems.length > 0) &&
                <Divider/>
                }

                <Row justify="start">
                    <Col span={12}>
                        <TimerForm startTimer={this.props.startTimer}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        timers: state.timerPage.timers
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestTimers, startTimer, stopTimer, deleteTimer})
)(TimerContainer);