import React from "react";
import {connect} from "react-redux";
import Timer from "./Timer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
    return {
        timers: state.timerPage.timers
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {})
)(Timer);