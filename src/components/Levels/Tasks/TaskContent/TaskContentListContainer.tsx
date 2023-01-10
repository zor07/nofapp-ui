import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../../../hoc/withAuthRedirect";
import css from './TaskContent.module.css'
import {Button, List, PageHeader, Popconfirm, Typography} from "antd";
import {NavLink, useParams} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {AppDispatch, AppStateType} from "../../../../redux/redux-store";
import {
    createTaskContent,
    deleteTaskContent,
    requestTaskContentList,
    TaskContentType,
    unmountTaskContentList
} from "../../../../redux/task-content-list-reducer";
import NewTaskContentForm from "./NewTaskContentForm";


type MapStatePropsType = {
    taskContentList: Array<TaskContentType>
}

type MapDispatchPropsType = {
    requestTaskContentList: (levelId: string, taskId: string) => void
    createTaskContent: (levelId: string, taskId: string, taskContent: TaskContentType) => void
    deleteTaskContent: (levelId: string, taskId: string, taskContentId: string) => void
    unmountTaskContentList: () => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = ({taskContentList}) => {
    const dispatch = useDispatch<AppDispatch>()
    const params = useParams()
    const levelId = params.levelId
    const taskId = params.taskId
    const [taskContentToCreate, setTaskContentToCreate] = useState(null)
    const [taskContentIdToDelete, setTaskContentIdToDelete] = useState(null)

    const {Title} = Typography;
    const {Text} = Typography;

    useEffect(() => {
        if (levelId && taskId) {
            dispatch(requestTaskContentList(levelId, taskId)).then()
        }
        return () => {
            dispatch(unmountTaskContentList())
        }
    }, [])

    useEffect(() => {
        if (levelId) {
            dispatch(requestTaskContentList(levelId, taskId)).then()
        }
    }, [levelId, taskId])

    useEffect(() => {
        if (taskContentToCreate) {
            dispatch(createTaskContent(levelId, taskId, taskContentToCreate))
                .then(() => dispatch(requestTaskContentList(levelId, taskId)).then())

        }
        setTaskContentToCreate(null)
    }, [taskContentToCreate])

    useEffect(() => {
        if (taskContentIdToDelete != null) {
            dispatch(deleteTaskContent(levelId, taskId, taskContentIdToDelete))
                .then(() => dispatch(requestTaskContentList(levelId, taskId)).then())
        }
        setTaskContentIdToDelete(null)
    }, [taskContentIdToDelete])

    const onDeleteTask = (levelId: string) => {
        setTaskContentIdToDelete(levelId)
    }

    const onCreateTaskContent = (taskContent: TaskContentType) => {
        setTaskContentToCreate(taskContent)
    }

    taskContentList.sort((a, b) => a.order - b.order)

    return (
        <div className={css.content}>
            <PageHeader title='Task Content List' />
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
                          <NewTaskContentForm createTaskContent={onCreateTaskContent}/>
                      </div>
                  }
                  dataSource={taskContentList}
                  renderItem = { taskContent => (
                      <List.Item key={taskContent.id}
                                 actions={[
                                     <NavLink to={`/config/levels/${taskContent.task.level.id}/tasks/${taskContent.task.id}/content/${taskContent.id}`}>
                                         <Button icon={<EditOutlined/>}>Edit</Button>
                                     </NavLink>,

                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${taskContent.title}] ?`}
                                                 onConfirm={() => onDeleteTask(taskContent.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>
                                 ]}>
                          <Title level={5}>{taskContent.title}</Title>
                          <Text>Order: {taskContent.order}</Text>
                      </List.Item>

                  )}/>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        taskContentList: state.taskContentList.taskContentList,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestTaskContentList, createTaskContent, deleteTaskContent, unmountTaskContentList
    })
)(LevelsContainer);
