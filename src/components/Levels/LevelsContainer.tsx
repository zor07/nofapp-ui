import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from './Levels.module.css'
import {LevelType, requestLevels} from "../../redux/levels-reducer";
import {Button, List, PageHeader, Popconfirm, Typography} from "antd";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


type MapStatePropsType = {
    levels: Array<LevelType>
}

type MapDispatchPropsType = {
    requestLevels: () => void
}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const LevelsContainer: React.FC<LevelsListContainerPropsType> = ({levels}) => {
    const {Title} = Typography;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestLevels())
    }, [])

    const onDeleteLevel = (levelId: string) => {
        alert(levelId)
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
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestLevels})
)(LevelsContainer);
