import React, {ReactElement, useEffect, useState} from "react";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {Avatar, Button, List, message, PageHeader, Popconfirm, Tag} from 'antd';
import {
    addPracticeToUser,
    clearCreatedPracticeId,
    createNewPractice,
    deletePractice,
    fetchPractices,
    PracticeListEntryType
} from "../../redux/practice-list-reducer";
import css from "./Practice.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";

type MapStatePropsType = {
    publicPractices: Array<PracticeListEntryType>,
    userPractices: Array<PracticeListEntryType>,
    createdPracticeId: string | null
}

type MapDispatchPropsType = {
    fetchPractices: () => void,
    createNewPractice: (isPublic: boolean) => void
    clearCreatedPracticeId: () => void
    deletePractice: (practiceId: string, isPublic: boolean) => void
    addPracticeToUser: (practiceId: string) => void
}

type OwnPropsType = {
    isPublic: boolean
}

type PracticeListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const PracticeListContainer: React.FC<PracticeListContainerPropsType> = ({isPublic, publicPractices, userPractices, createdPracticeId}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isCreatingNewPractice, setIsCreatingNewPractice] = useState(false)
    const [toDeletePracticeId, setDeletePracticeID] = useState('')
    const [addToUserPracticeId, setAddToUserPracticeId] = useState('')

    useEffect(() => {
        dispatch(fetchPractices)
    }, [isPublic])

    useEffect(() => {
        if (isCreatingNewPractice) {
            dispatch(createNewPractice(isPublic))
        }
    }, [isCreatingNewPractice])

    useEffect(() => {
        dispatch(fetchPractices())
        if (createdPracticeId) {
            setIsCreatingNewPractice(false)
            const newId = createdPracticeId
            dispatch(clearCreatedPracticeId())
            navigate(`/practice/editor/${newId}`)
        }
    }, [createdPracticeId])

    useEffect(() => {
        if (toDeletePracticeId !== '') {
            dispatch(deletePractice(toDeletePracticeId, isPublic))
            setTimeout(() => {
                // TODO describe types in reducers, and return promise from dispatch
                dispatch(fetchPractices())
            }, 250)
            setDeletePracticeID('')
            message.info('Deleted')
        }
    }, [toDeletePracticeId])

    useEffect(() => {
        if (addToUserPracticeId !== '') {
            dispatch(addPracticeToUser(addToUserPracticeId ))
            setTimeout(() => {
                // TODO describe types in reducers, and return promise from dispatch
                dispatch(fetchPractices())
            }, 250)
            setAddToUserPracticeId('')
            message.info('Added practice')
        }
    }, [addToUserPracticeId])

    const onCreateNewPractice = () => {
        setIsCreatingNewPractice(true)
    }

    const onEditPractice = (practiceId: string) => {
        navigate(`/practice/editor/${practiceId}`)
    }

    const onDeletePractice = (practiceId: string) => {
        setDeletePracticeID(practiceId)
    }

    const onAddToMyPractices = (practiceId: string) => {
        setAddToUserPracticeId(practiceId)
    }

    const onRemoveFromMyPractices = (practiceId: string) => {
        setDeletePracticeID(practiceId)
    }

    const createListItemActions = (practice: PracticeListEntryType) : Array<ReactElement> => {
        const actions = [
            <Button onClick={() => onEditPractice(practice.id)}
                    icon={<EditOutlined/>}>Edit</Button>,
            <Popconfirm placement="right"
                        title={`Are you shure you want to delete [${practice.name}] ?`}
                        onConfirm={() => onDeletePractice(practice.id)}
                        okText="Yes"
                        cancelText="No">
                <Button danger icon={<DeleteOutlined/>}> Delete </Button>
            </Popconfirm>
        ]
        if (isPublic && !userOwnsPractice(practice.id)) {
            actions.unshift(<Button onClick={() => onAddToMyPractices(practice.id)}
                                    icon={<PlusCircleOutlined/>}>Add to my list</Button>)
        }

        if (!isPublic && practice.isPublic) {
            actions.unshift(<Button onClick={() => {onRemoveFromMyPractices(practice.id)}}
                                    icon={<MinusCircleOutlined/>}>Remove from my list</Button>)
        }

        return actions
    }

    const userOwnsPractice = (practiceId: string) : boolean => {
        return userPractices.filter(practice => practice.id === practiceId).length > 0
    }

    return (
        <div className={css.content}>
            <PageHeader title={isPublic ? 'All Practices' : 'My Practices'} />
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
                  dataSource={isPublic ? publicPractices : userPractices}
                  renderItem={practice => {
                      return (
                          <List.Item key={practice.id}
                                     actions={createListItemActions(practice)}>
                              <List.Item.Meta
                                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                  title={<NavLink to={`/practice/${practice.id}`}>{practice.name}</NavLink>}
                                  description={<div>
                                      {practice.description}
                                      <div>
                                          {practice.isPublic
                                              ? <Tag color="green">Public practice</Tag>
                                              : <Tag color="blue">My Practice</Tag>
                                          }
                                      </div>
                                  </div>}
                              />
                          </List.Item>
                      );
                  }}/>
        </div>
    )
}



let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        publicPractices: state.practiceList.publicPractices,
        userPractices: state.practiceList.userPractices,
        createdPracticeId: state.practiceList.createdPracticeId
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {fetchPractices,
        createNewPractice, clearCreatedPracticeId, deletePractice, addPracticeToUser})
)(PracticeListContainer);