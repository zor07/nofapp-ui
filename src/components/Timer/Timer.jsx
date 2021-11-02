import React from "react";
import css from './Timer.module.css'

class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timePassed: this.getTimePassed()
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    tick() {
        this.setState({
            timePassed: this.getTimePassed()
        })
    }

    getTimePassed = () => {
        const secondsMS = 1000
        const minutesMS = secondsMS * 60;
        const hoursMS = minutesMS * 60;
        const daysMS = hoursMS * 24;

        const start = this.props.timers[0].start;
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