import React, {useState} from 'react';
import css from './Tasks/Tasks.module.css'
import {TaskType} from "../../redux/tasks-reducer";
import {Button, Form, List, Modal, Popconfirm, Space, Typography} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {LevelType} from "../../redux/levels-reducer";
import NewTaskForm from "./forms/NewTaskForm";


type MapStatePropsType = {
    level: LevelType
}

type MapDispatchPropsType = {
    saveTask: (task: TaskType) => void
    deleteTask: (task: TaskType) => void
}

type OwnPropsType = {}

type LevelTasksPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const TaskList: React.FC<LevelTasksPropsType> = ({
       level,
       saveTask,
       deleteTask,
    }) => {

    const tasks = level.tasks
    tasks.sort((a, b) => a.order - b.order)

    const {Title} = Typography;
    const {Text} = Typography;

    const [taskForm] = Form.useForm();
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [taskFormVisible, setTaskFormVisible] = useState(false)

    const showTaskFormModal = () => {
        setTaskFormVisible(true)
    }

    const onTaskFormSubmit = (task: TaskType) => {
        saveTask(task)
        setTaskFormVisible(false)
        setTaskToEdit(null)
        taskForm.resetFields()
    }

    const onTaskFormCancel = () => {
        setTaskFormVisible(false)
        setTaskToEdit(null)
        taskForm.resetFields()
    };

    return (
        <div className={css.content}>
            <List itemLayout="vertical"
                  size="small"
                  footer={
                      <Button block
                              size={'large'}
                              icon={<PlusOutlined />}
                              onClick={showTaskFormModal}
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
                                                     onConfirm={() => deleteTask(task)}
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
            <Modal visible={taskFormVisible}
                   width={'600px'}
                   onOk={taskForm.submit}
                   onCancel={onTaskFormCancel}
                   title={'Create new task'}>
                <NewTaskForm form={taskForm} task={taskToEdit} level={level} handleSubmit={onTaskFormSubmit} />
            </Modal>
        </div>
    )
}


export default TaskList