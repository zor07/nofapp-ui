import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {requestTimers} from "../../redux/timer-reducer";
import TimerCard from "./TimerCard";
import NewTimerForm from "./NewTimerForm";


class TimerContainer extends React.Component {

    componentDidMount() {
        this.props.requestTimers();
    }

    render() {
        const timers = this.props.timers
            ? this.props.timers.map(timer => <TimerCard key={timer.id} timer={timer}/>)
            : null

        return (
            <div>
                <div>
                    {timers}
                </div>
                <div>
                    <NewTimerForm />
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
    connect(mapStateToProps, {requestTimers})
)(TimerContainer);