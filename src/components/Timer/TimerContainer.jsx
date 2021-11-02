import React from "react";
import {connect} from "react-redux";
import Timer from "./Timer";

const mapStateToProps = (state) => {
    return {
        timers: state.timerPage.timers
    }

}

const TimerContainer = connect(mapStateToProps, {}) (Timer);

export default TimerContainer;