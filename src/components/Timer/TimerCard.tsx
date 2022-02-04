import React from "react";
import Timer from "./Timer";
import css from './Timer.module.css'
import {TimerType} from "../../redux/timer-reducer";
import {Button} from "antd";

type TimerCardPropsType = {
    timer: TimerType
    stopTimer: (timerId: string) => void
    deleteTimer: (timerId: string) => void
}

const TimerCard: React.FC<TimerCardPropsType> = ({timer, stopTimer, deleteTimer}) => {

    const onStopClick = () => {
        stopTimer(timer.id)
    }

    const onDeleteClick = () => {
        deleteTimer(timer.id)
    }

    return (
        <div className={css.timerCard}>
            <div className={css.description}>
                {timer.description}
            </div>
            <div>
                <Timer timer={timer} />
            </div>
            <div>
                {
                    timer.isRunning
                        ? <Button type="primary" onClick={onStopClick}>Stop</Button>
                        : <Button type="primary"  onClick={onDeleteClick}>Delete</Button>
                }
            </div>
        </div>
    )
}

export default TimerCard;