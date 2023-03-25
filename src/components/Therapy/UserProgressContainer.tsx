import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Therapy.module.css'

import {fetchUserProgress, finishCurrentTask, UserProgressType, UserTaskType} from "../../redux/user-progress-reducer";
import TaskDataViewer from "./TaskDataViewer";
import {Button, List} from "antd";
import {EditOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";


type MapStatePropsType = {
    userProgress: UserProgressType
}

type MapDispatchPropsType = {
    fetchUserProgress: () => void
    finishCurrentTask: () => void
}

type OwnPropsType = {}

type TherapyContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const UserProgressContainer: React.FC<TherapyContainerPropsType> = ({userProgress}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [taskToDisplay, setTaskToDisplay] = useState<UserTaskType>(userProgress ? userProgress.uncompletedTask : null)
    const [shouldFinishTask, setShouldFinishTask] = useState<boolean>(false)
    const [selectTaskMode, setSelectTaskMode] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchUserProgress()).then()

    }, [])

    useEffect(() => {
        if (userProgress) {
            setTaskToDisplay(userProgress.uncompletedTask)
        }
    }, [userProgress])

    useEffect(() => {
        if (shouldFinishTask) {
            dispatch(finishCurrentTask())
                .then(() => dispatch(fetchUserProgress()))
                .then(() => setShouldFinishTask(false))
        }
    }, [shouldFinishTask])

    const taskList = userProgress ? userProgress.userTasks : []

    taskList.sort((a, b) =>
        a.task.level.order - b.task.level.order ||
        a.task.order - b.task.order
    )

    const displayTask = (userTask: UserTaskType) => {
        setTaskToDisplay(userTask)
        setSelectTaskMode(false)
    }

    return (
        <div className={css.content}>
            <div>
                {taskToDisplay && !selectTaskMode&&
                    <div>
                        <TaskDataViewer userTask={taskToDisplay}
                                        onFinishTask={() => setShouldFinishTask(true)}
                                        onOpenTaskList={() => setSelectTaskMode(true)}/>
                    </div>
                }
                {taskList.length > 0 && selectTaskMode &&
                    <div>
                        <List itemLayout="vertical"
                              size="small"
                              dataSource={userProgress.userTasks}
                              renderItem={userTask => (
                                  <List.Item key={userTask.task.id}
                                             extra={[
                                                 <Button size={'small'}
                                                         type={'dashed'}
                                                         onClick={() => displayTask(userTask)}
                                                         icon={<EditOutlined/>}/>

                                             ]}>

                                      <Title level={5}>{`${userTask.task.level.name} -  ${userTask.task.name}`}</Title>

                                  </List.Item>
                              )}/>
                    </div>
                }


            </div>

        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProgress: state.therapy.userProgress,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        fetchUserProgress, finishCurrentTask
    })
)(UserProgressContainer);
