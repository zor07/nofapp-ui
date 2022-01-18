import React from "react";
import Timer from "./Timer";
import css from './Timer.module.css'
import {TimerType} from "../../redux/timer-reducer";

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
                        ? <button onClick={onStopClick}>Stop</button>
                        : <button onClick={onDeleteClick}>Delete</button>
                }
            </div>
        </div>
    )
}

export default TimerCard;