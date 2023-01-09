import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import css from './Tasks.module.css'
import {Button, List, PageHeader, Popconfirm, Typography} from "antd";
import {NavLink, useParams} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {AppDispatch, AppStateType} from "../../../redux/redux-store";
import {createLevelTask, deleteTask, requestTasks, TaskType, unmountTasks} from "../../../redux/tasks-reducer";
import NewTaskForm from "./NewTaskForm";


type MapStatePropsType = {
    tasks: Array<TaskType>
}

type MapDispatchPropsType = {
    requestTasks: (levelId: string) => void
    createLevelTask: (levelId: string, task: TaskType) => void
    deleteTask: (levelId: string, taskId: string) => void
    unmountTasks: () => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const TaskListContainer: React.FC<LevelsListContainerPropsType> = ({tasks}) => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const levelId = params.levelId
    const [taskToCreate, setTaskToCreate] = useState(null)
    const [taskIdToDelete, setTaskIdToDelete] = useState(null)

    const {Title} = Typography;
    const {Text} = Typography;
    const {Paragraph} = Typography;

    useEffect(() => {
        if (levelId) {
            dispatch(requestTasks(levelId)).then()
        }
        return () => {
            dispatch(unmountTasks())
        }
    }, [])

    useEffect(() => {
        if (levelId) {
            dispatch(requestTasks(levelId)).then()
        }
    }, [levelId])

    useEffect(() => {
        if (taskToCreate) {
            dispatch(createLevelTask(levelId, taskToCreate))
                .then(() => dispatch(requestTasks(levelId)).then())

        }
        setTaskToCreate(null)
    }, [taskToCreate])

    useEffect(() => {
        if (taskIdToDelete != null) {
            dispatch(deleteTask(levelId, taskIdToDelete))
                .then(() => dispatch(requestTasks(levelId)).then())
        }
        setTaskIdToDelete(null)
    }, [taskIdToDelete])

    const onDeleteTask = (taskId: string) => {
        setTaskIdToDelete(taskId)
    }

    const onCreateTask = (task: TaskType) => {
        setTaskToCreate(task)
    }

    tasks.sort((a, b) => a.order - b.order)

    return (
        <div className={css.content}>
            <PageHeader title='Tasks' />
            <List itemLayout="vertical"
                  size="large"
                  pagination={{
                      onChange: page => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  footer={
                      <div>
                          <NewTaskForm createTask={onCreateTask}/>
                      </div>
                  }
                  dataSource={tasks}
                  renderItem = { task => (
                      <List.Item key={task.id}
                                 actions={[
                                     <NavLink to={`/config/levels/${task.level.id}/tasks/${task.id}/content`}>
                                         <Button icon={<EditOutlined/>}>Edit</Button>
                                     </NavLink>,

                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${task.name}] ?`}
                                                 onConfirm={() => onDeleteTask(task.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>
                                 ]}>
                          <Title level={5}>{task.name}</Title>
                          <Paragraph>{task.description}</Paragraph>
                          <Text>Order: {task.order}</Text>
                      </List.Item>

                  )}/>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        tasks: state.tasks.tasks,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestTasks, createLevelTask, deleteTask, unmountTasks
    })
)(TaskListContainer);
