import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Levels.module.css'
import {createLevel, deleteLevel, LevelType, requestLevels} from "../../redux/levels-reducer";
import {Button, List, PageHeader, Popconfirm} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import NewLevelForm from "./NewLevelForm";
import LevelItem from "./LevelItem";


type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {
    requestLevels: () => void
    createLevel: (level: LevelType) => void
    deleteLevel: (levelId: string) => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = ({levels}) => {
    const dispatch = useDispatch<AppDispatch>()
    const [levelToCreate, setLevelToCreate] = useState(null)
    const [levelToDelete, setLevelToDelete] = useState(null)

    useEffect(() => {
        dispatch(requestLevels()).then()
    }, [])

    useEffect(() => {
        if (levelToCreate) {
            dispatch(createLevel(levelToCreate))
                .then(() => dispatch(requestLevels()).then())

        }
        setLevelToCreate(null)
    }, [levelToCreate])

    useEffect(() => {
        if (levelToDelete != null) {
            dispatch(deleteLevel(levelToDelete))
                .then(() => dispatch(requestLevels()).then())
        }
        setLevelToDelete(null)
    }, [levelToDelete])

    const onDeleteLevel = (levelId: string) => {
        setLevelToDelete(levelId)
    }

    const onLevelCreate = (level: LevelType) => {
        setLevelToCreate(level)
    }

    levels.sort((a, b) => a.order - b.order)

    return (
        <div className={css.content}>
            <PageHeader title='Levels' />
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
                          <NewLevelForm createLevel={onLevelCreate}/>
                      </div>
                  }
                  dataSource={levels}
                  renderItem = { level => (
                      <List.Item key={level.id}
                                 actions={[
                                     <NavLink to={`/config/levels/${level.id}/tasks/`}>
                                         <Button icon={<EditOutlined/>}>Edit</Button>
                                     </NavLink>,

                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${level.name}] ?`}
                                                 onConfirm={() => onDeleteLevel(level.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>
                                 ]}>
                            <LevelItem level={level} />
                      </List.Item>

                  )}/>
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
        requestLevels, createLevel, deleteLevel
    })
)(LevelsContainer);
