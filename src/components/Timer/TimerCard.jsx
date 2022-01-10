import React from "react";
import Timer from "./Timer";
import css from './Timer.module.css'

const TimerCard = ({timer}) => {

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
                    timer.stop
                    ? <button>Delete</button>
                    : <button>Stop</button>
                }
            </div>
        </div>
    )
}

export default TimerCard;