import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Levels.module.css'
import {createLevel, LevelType, requestLevels} from "../../redux/levels-reducer";
import {Button, List, PageHeader, Popconfirm, Typography} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import NewLevelForm from "./NewLevelForm";


type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {
    requestLevels: () => void
    createLevel: (level: LevelType) => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = ({levels}) => {
    const {Title} = Typography;
    const dispatch = useDispatch()
    const [levelToCreate, setLevelToCreate] = useState(null)

    useEffect(() => {
        dispatch(requestLevels())
    }, [])

    useEffect(() => {
        dispatch(requestLevels())
    }, [levels])

    useEffect(() => {
        if (levelToCreate != null) {
            dispatch(createLevel(levelToCreate))
        }
        setLevelToCreate(null)
    }, [levelToCreate])

    const onDeleteLevel = (levelId: string) => {
        alert(levelId)
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
                          <Title level={5}>{level.name}</Title>
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
        requestLevels, createLevel
    })
)(LevelsContainer);
