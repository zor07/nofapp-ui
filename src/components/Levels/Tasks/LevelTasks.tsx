import React from 'react';
import css from './Tasks.module.css'
import {TaskType} from "../../../redux/tasks-reducer";
import {Button, List, Popconfirm, Space, Typography} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {LevelType} from "../../../redux/levels-reducer";


type MapStatePropsType = {
    level: LevelType
}

type MapDispatchPropsType = {
    createTask: (levelId: string, task: TaskType) => void
    deleteTask: (levelId: string, taskId: string) => void
}

type OwnPropsType = {}

type LevelTasksPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelTasks: React.FC<LevelTasksPropsType> = ({
       level,
       createTask,
       deleteTask,
    }) => {

    const tasks = level.tasks
    tasks.sort((a, b) => a.order - b.order)

    const {Title} = Typography;
    const {Text} = Typography;
    const {Paragraph} = Typography;

    return (
        <div className={css.content}>
            <List itemLayout="vertical"
                  size="small"
                  footer={
                      <Button block
                              size={'large'}
                              icon={<PlusOutlined />}
                              type={"dashed"} >
                          Add task
                      </Button>
                  }
                  dataSource={tasks}
                  renderItem = { task => (
                      <List.Item key={task.id}
                                 extra={[
                                     <Space direction={'vertical'}>
                                         <NavLink to={`/config/levels/${task.level.id}/tasks/${task.id}/content`}>
                                             <Button size={'small'}
                                                     type={'dashed'}
                                                     icon={<EditOutlined/>}/>
                                         </NavLink>
                                         <Popconfirm placement="right"
                                                     title={`Are you shure you want to delete [${task.name}] ?`}
                                                     onConfirm={() => deleteTask(level.id, task.id)}
                                                     okText="Yes"
                                                     cancelText="No">
                                             <Button danger
                                                     size={'small'}
                                                     type={'dashed'}
                                                     icon={<DeleteOutlined/>}/>
                                         </Popconfirm>
                                     </Space>
                                 ]}>
                          <Title level={5}>{task.name}</Title>
                          <div>
                              <Text>Order: {task.order}</Text>
                          </div>
                          <div>
                              <Text>{task.description}</Text>
                          </div>
                      </List.Item>
                  )}/>
        </div>
    )
}


export default LevelTasks