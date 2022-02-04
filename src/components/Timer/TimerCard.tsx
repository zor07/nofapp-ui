import React from "react";
import Timer from "./Timer";
import css from './Timer.module.css'
import {TimerType} from "../../redux/timer-reducer";
import {Button, Card} from "antd";
import {DeleteOutlined, PauseOutlined} from "@ant-design/icons";

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

        <Card title={<h2>{timer.description}</h2> }
              style={{ width: 250 }}
              actions={[
                  timer.isRunning
                      ? <Button icon={<PauseOutlined/>} onClick={onStopClick}>Stop</Button>
                      : <Button danger icon={<DeleteOutlined/>}  onClick={onDeleteClick}>Delete</Button>
              ]}>
            <div className={css.timerCard}>
                <Timer timer={timer} />
            </div>
        </Card>


    )
}

export default TimerCard;