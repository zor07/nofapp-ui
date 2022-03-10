import React, {useEffect, useState} from "react";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {Avatar, Button, List, message, Popconfirm, Typography} from 'antd';
import {getPractices, PracticeListEntryType} from "../../redux/practice-list-reducer";
import css from "./PracticeListContainer.module.css";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

type MapStatePropsType = {
    practices: Array<PracticeListEntryType>
}

type MapDispatchPropsType = {
    getPractices: (isPublic: boolean) => void
}

type OwnPropsType = {
    isPublic: boolean
}

type PracticeListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const PracticeListContainer: React.FC<PracticeListContainerPropsType> = ({isPublic, practices}) => {
    const {Title} = Typography
    const dispatch = useDispatch()
    const [isCreatingNewPractice, setCreatingNewPractice] = useState(false)

    useEffect(() => {
        dispatch(getPractices(isPublic))
    }, [isPublic])

    const onCreateNewPractice = () => {
        message.info("Creating new practice", 0.5)
    }

    const onDeletePractice = (practiceId) => {
        message.info(`Deleting practice ${practiceId}`, 0.5)
    }


    return (
        <div className={css.content}>
            <Title level={3}>{ isPublic ? 'All Practices' : 'My Practices' }</Title>
            <List itemLayout="horizontal"
                  size="large"
                  pagination={{
                      onChange: page => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  footer={
                      <div>
                          <Button loading={isCreatingNewPractice}
                                  type="primary"
                                  onClick={onCreateNewPractice}>
                              Create New Practice
                          </Button>
                      </div>
                  }
                  dataSource={practices}
                  renderItem={practice => (
                      <List.Item key={practice.id}
                                 actions={[
                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${practice.name}] ?`}
                                                 onConfirm={() => onDeletePractice(practice.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>
                                 ]}>
                          <List.Item.Meta
                              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                              title={<NavLink to={`/practices/${practice.id}`}>{practice.name}</NavLink>}
                              description={practice.description}
                          />
                      </List.Item>
                  )}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        practices: state.practiceList.practices
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {getPractices})
)(PracticeListContainer);