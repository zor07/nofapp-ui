import css from "./ProfileTimer.module.css";
import Timer from "../../Timer/Timer";
import {Button} from "antd";
import React, {useEffect, useState} from "react";
import {TimerType} from "../../../redux/timer-reducer";
import {useDispatch} from "react-redux";

type MapStatePropsType = {
    start: Date
    userId: string
}

type MapDispatchPropsType = {
    relapsed: (userId: string) => void
}

const ProfileTimer : React.FC<MapStatePropsType & MapDispatchPropsType> = ({userId, start, relapsed}) => {
    const dispatch = useDispatch()

    const [shouldRelapse, setShouldRelapse] = useState(false)

    useEffect(() => {
        if (shouldRelapse) {
            dispatch(relapsed(userId))
            setShouldRelapse(false)
        }
    }, [shouldRelapse])

    const timer: TimerType = {
        id: "",
        isRunning: true,
        start: start,
        description: "main"
    }

    return (
        <div className={css.timerComponent}>
            <div className={css.timer}>
                <Timer timer={timer}/>
            </div>
            <div>
                <Button danger onClick={() => setShouldRelapse(true)}>Relapsed</Button>
            </div>
        </div>
    )
}

export default ProfileTimer