import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Levels.module.css'
import {saveLevel, deleteLevel, LevelType, requestLevels} from "../../redux/levels-reducer";
import {Button, Form, List, Modal, PageHeader, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import LevelItem from "./LevelItem";
import {saveTask, deleteTask, TaskType} from "../../redux/tasks-reducer";
import LevelTasks from "./LevelTasks";
import NewLevelForm from "./NewLevelForm";


type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {
    requestLevels: () => void
    saveLevel: (level: LevelType) => void
    deleteLevel: (levelId: string) => void
    saveTask: (levelId: string, task: TaskType) => void
    deleteTask: (levelId: string, taskId: string) => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = ({levels}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [levelForm] = Form.useForm();

    const [levelToSave, setLevelToSave] = useState(null)
    const [levelToEdit, setLevelToEdit] = useState(null)
    const [levelToDelete, setLevelToDelete] = useState(null)
    const [levelFormVisible, setLevelFormVisible] = useState(false)

    const [taskToSave, setTaskToSave] = useState(null)
    const [taskToDelete, setTaskToDelete] = useState(null)


    useEffect(() => {
        dispatch(requestLevels()).then()
    }, [])

    useEffect(() => {
        if (levelToSave) {
            dispatch(saveLevel(levelToSave))
                .then(() => dispatch(requestLevels()).then())

        }
        setLevelToSave(null)
    }, [levelToSave])

    useEffect(() => {
        if (levelToDelete != null) {
            dispatch(deleteLevel(levelToDelete))
                .then(() => dispatch(requestLevels()).then())
        }
        setLevelToDelete(null)
    }, [levelToDelete])

    useEffect(() => {
        if (taskToSave) {
            dispatch(saveTask(taskToSave.level.id, taskToSave))
                .then(() => dispatch(requestLevels()).then())

        }
        setTaskToSave(null)
    }, [taskToSave])

    useEffect(() => {
        if (taskToDelete) {
            dispatch(deleteTask(taskToDelete.level.id, taskToDelete.id))
                .then(() => dispatch(requestLevels()).then())
        }
        setTaskToDelete(null)
    }, [taskToDelete])




    const onDeleteLevel = (levelId: string) => {
        setLevelToDelete(levelId)
    }

    const showLevelFormModal = () => {
        setLevelFormVisible(true)
    }

    const onEditLevel = (level: LevelType) => {

        setLevelToEdit(level)
        showLevelFormModal()
    }

    const onLevelFormSubmit = (level: LevelType) => {
        setLevelToSave(level)
        setLevelFormVisible(false)
        setLevelToEdit(null)
        levelForm.resetFields()
    }

    const onLevelFormCancel = () => {
        setLevelFormVisible(false)
        setLevelToEdit(null)
        levelForm.resetFields()
    };

    levels.sort((a, b) => a.order - b.order)

    return (
        <div className={css.content}>
            <PageHeader title='Levels' />
            <List itemLayout="vertical"
                  size="small"
                  footer={
                      <div>
                          <Button block
                                  size={'large'}
                                  type={"dashed"}
                                  onClick={showLevelFormModal}
                                  icon={<PlusOutlined />}  >
                              Add Level
                          </Button>
                      </div>
                  }
                  dataSource={levels}
                  renderItem = { level => (
                      <List.Item key={level.id}
                                 extra={[
                                     <Space direction={'vertical'}>
                                         <Button size={'small'}
                                                 type={'dashed'}
                                                 onClick={() => onEditLevel(level)}
                                                 icon={<EditOutlined/>} />
                                         <Popconfirm placement="right"
                                                     title={`Are you shure you want to delete [${level.name}] ?`}
                                                     onConfirm={() => onDeleteLevel(level.id)}
                                                     okText="Yes"
                                                     cancelText="No">
                                             <Button danger
                                                     type={'dashed'}
                                                     size={'small'}
                                                     icon={<DeleteOutlined/>}/>
                                         </Popconfirm>
                                     </Space>
                                 ]}>
                            <LevelItem level={level} />
                            <LevelTasks level={level}
                                        saveTask={(task) => setTaskToSave(task)}
                                        deleteTask={(task) => setTaskToDelete(task)} />
                      </List.Item>
                  )}/>
            <Modal visible={levelFormVisible}
                   onOk={levelForm.submit}
                   onCancel={onLevelFormCancel}
                   width={'1000px'}
                   title={'Create new level'}>
                <NewLevelForm form={levelForm} level={levelToEdit} handleSubmit={onLevelFormSubmit} />
            </Modal>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        levels: state.levels.levels,
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestLevels, saveLevel, deleteLevel, saveTask, deleteTask
    })
)(LevelsContainer);
