import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {deleteTimer, requestTimers, startTimer, stopTimer} from "../../redux/timer-reducer";
import TimerCard from "./TimerCard";
import NewTimerForm from "./NewTimerForm";


class TimerContainer extends React.Component {

    componentDidMount() {
        this.props.requestTimers();
    }

    render() {
        const timers = this.props.timers;
        const runningItems = timers
            ? timers.filter(timer => timer.isRunning)
                    .map(timer => <TimerCard key={timer.id}
                                             stopTimer={this.props.stopTimer}
                                             deleteTimer={this.props.deleteTimer}
                                             timer={timer}/>)
            : null

        const stoppedItems = timers
            ? timers.filter(timer => !timer.isRunning)
                .map(timer => <TimerCard key={timer.id}
                                         stopTimer={this.props.stopTimer}
                                         deleteTimer={this.props.deleteTimer}
                                         timer={timer}/>)
            : null

        return (
            <div>
                <div>
                    {runningItems}
                </div>
                <div>
                    {stoppedItems}
                </div>
                <div>
                    <NewTimerForm startTimer={this.props.startTimer}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timers: state.timerPage.timers
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {requestTimers, startTimer, stopTimer, deleteTimer})
)(TimerContainer);