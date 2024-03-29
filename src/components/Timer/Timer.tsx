import React from "react";
import css from './Timer.module.css'
import {TimerType} from "../../redux/timer-reducer";
import {adjustForTimezone} from "../../utils/dateUtils";

type TimerPropsType = {
    timer: TimerType,
}

type TimerStateType = {
    timePassed: string,
}


class Timer extends React.Component<TimerPropsType, TimerStateType> {

    private intervalId: any;

    constructor(props) {
        super(props);
        this.state = {
            timePassed: this.getTimePassed(this.props.timer.start),
        }
        this.intervalId = 0
    }

    componentDidMount() {
        if (this.props.timer.isRunning) {
            this.intervalId = setInterval(
                () => this.tick(),
                1000
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick() {
        this.setState({
            timePassed: this.getTimePassed(this.props.timer.start)
        })
    }

    getTimePassed = (start: Date) => {
        return this._getDiffWithHours(start.getTime())
    }

    _getDiffWithHours(start: number) {
        const secondsMS = 1000
        const minutesMS = secondsMS * 60;
        const hoursMS = minutesMS * 60;
        // TODO fix timers
        const till = this.props.timer.isRunning
            ? new Date(adjustForTimezone(new Date(Date.now()).toString())).getTime()
            : this.props.timer.stop.getTime();

        const diff = Math.abs(start - till);

        const hours = Math.floor(diff   / hoursMS)
        const minutes = Math.floor((diff % hoursMS)  / minutesMS)
        const seconds = Math.floor((diff % hoursMS % minutesMS) / secondsMS) % minutesMS;

        const hoursStr = ('00' + hours.toString()).slice(-3)
        const minutesStr = ('0' + minutes.toString()).slice(-2)
        const secondsStr = ('0' + seconds.toString()).slice(-2)

        return`${hoursStr}:${minutesStr}:${secondsStr}`
    }

    _getDiffWithDays(start) {
        const secondsMS = 1000
        const minutesMS = secondsMS * 60;
        const hoursMS = minutesMS * 60;
        const daysMS = hoursMS * 24;

        const now = Date.now();
        const diff = Math.abs(start - now);

        const days = Math.floor(diff / daysMS)
        const hours = Math.floor((diff % daysMS)  / hoursMS)
        const minutes = Math.floor((diff % daysMS % hoursMS)  / minutesMS)
        const seconds = Math.floor((diff % daysMS % hoursMS % minutesMS) / secondsMS) % minutesMS;

        const daysStr = ('00' + days.toString()).slice(-3)
        const hoursStr = ('0' + hours.toString()).slice(-2)
        const minutesStr = ('0' + minutes.toString()).slice(-2)
        const secondsStr = ('0' + seconds.toString()).slice(-2)

        return`${daysStr}:${hoursStr}:${minutesStr}:${secondsStr}`
    }

    render() {
        return <div className={css.timer}>
                {this.state.timePassed}
        </div>
    }


}

export default Timer;