import React from "react";
import Timer from "./Timer";
import css from './Timer.module.css'

const TimerCard = ({timer, stopTimer, deleteTimer}) => {

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