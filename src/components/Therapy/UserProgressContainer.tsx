import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Therapy.module.css'

import {fetchUserProgress, finishCurrentTask, UserProgressType} from "../../redux/user-progress-reducer";
import TaskDataViewer from "./TaskDataViewer";
import {Button, List, Typography} from "antd";
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
    const [taskToDisplay, setTaskToDisplay] = useState(null)
    const [shouldFinishTask, setShouldFinishTask] = useState(false)


    useEffect(() => {
        dispatch(fetchUserProgress())
            .then(() => setTaskToDisplay({
                task: userProgress.uncompletedTask,
                completed: false
            }))

    }, [])

    useEffect(() => {
        if (shouldFinishTask) {
            dispatch(finishCurrentTask())
                .then(() => dispatch(fetchUserProgress()))
                .then(() => setTaskToDisplay({
                    task: userProgress.uncompletedTask,
                    completed: false
                }))
                .then(() => setShouldFinishTask(false))
        }
    }, [shouldFinishTask])

    const taskList = userProgress ? userProgress.userTasks : []
    taskList.sort( (a, b) =>
            a.task.level.order - b.task.level.order ||
            a.task.order - b.task.order
    )

    const {Text} = Typography;
    return (
        <div className={css.content}>
            <div>
                {/*  Task Data  */}
                {taskToDisplay &&
                    <TaskDataViewer userTask={taskToDisplay} onFinishTask={() => setShouldFinishTask(true)}/>
                }

            </div>
            <div>
            {/*  Task List  */}
                {userProgress && userProgress.userTasks &&

                    <List itemLayout="vertical"
                          size="small"
                          dataSource={userProgress.userTasks}
                          renderItem = { userTask => (
                              <List.Item key={userTask.task.id}
                                         extra={[
                                             <Button size={'small'}
                                                     type={'dashed'}
                                                     onClick={() => setTaskToDisplay(userTask)}
                                                     icon={<EditOutlined/>}> </Button>
                                         ]}>

                                  <Title level={5}>{`${userTask.task.level.name} -  ${userTask.task.name}`}</Title>

                              </List.Item>
                          )}/>
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
