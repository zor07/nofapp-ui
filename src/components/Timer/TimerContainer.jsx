import React from "react";
import {connect} from "react-redux";
import Timer from "./Timer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {requestTimers} from "../../redux/timer-reducer";


class TimerContainer extends React.Component {

    componentDidMount() {
        this.props.requestTimers();
    }

    render() {


        const timers = this.props.timers
            ? this.props.timers.map(timer => <Timer key={timer.id} timer={timer}/>)
            : null

        return (
            <div>
                {timers}
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