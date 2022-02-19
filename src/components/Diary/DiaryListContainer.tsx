import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {clearCreatedDiaryId, createNewDiary, deleteDiary, DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {NavLink, useNavigate} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Button, List, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Typography} from 'antd';

type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
    createdDiaryId: string | null
}

type MapDispatchPropsType = {
    requestDiaries: () => void
    deleteDiary: (diaryId: string) => void
    createNewDiary: () => void
    clearCreatedDiaryId: () => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DiaryListContainer: React.FC<DiariesContainerPropsType> = (props) => {
    const {Title} = Typography;
    const [deleteDiaryId, setDeleteDiaryId] = useState('')
    const [isCreatingNewDiaryId, setIsCreatingNewDiaryId] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(requestDiaries())
    }, [])

    useEffect(() => {
        dispatch(requestDiaries())
        if (props.createdDiaryId) {
            setIsCreatingNewDiaryId(false)
            const newId = props.createdDiaryId
            dispatch(clearCreatedDiaryId())
            navigate(`/diary/editor/${newId}`)
        }
    }, [props.createdDiaryId])

    useEffect(() => {
        if (deleteDiaryId !== '') {
            dispatch(deleteDiary(deleteDiaryId))
            setDeleteDiaryId('')
        }
    }, [deleteDiaryId])

    useEffect(() => {
        if (isCreatingNewDiaryId) {
            dispatch(createNewDiary())
        }
    }, [isCreatingNewDiaryId])

    const onCreateNewDiary= () => {
        setIsCreatingNewDiaryId(true)
    }

    const onDeleteDiary = (diaryId: string) => {
        setDeleteDiaryId(diaryId)
    }

    return (
        <div>
            <Title level={3}>Diary</Title>
            <List itemLayout="vertical"
                  size="large"
                  pagination={{
                      onChange: page => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  dataSource={props.diaries}
                  renderItem={item => (
                      <List.Item key={item.id}
                                 actions={[
                                     <NavLink to={`/diary/editor/${item.id}`}>
                                         <Button icon={<EditOutlined/>}>Edit</Button>
                                     </NavLink>,

                                     <Popconfirm placement="top"
                                                 title={`Are you shure you want to delete [${item.title}] ?`}
                                                 onConfirm={() => onDeleteDiary(item.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>

                                 ]}>
                          <Title level={5}>{item.title}</Title>
                      </List.Item>
                  )}/>
            <div>
                <Button loading={isCreatingNewDiaryId} type="primary" onClick={onCreateNewDiary}>
                    New note
                </Button>
            </div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diaries: state.diaries.diaries,
        createdDiaryId: state.diaries.createdDiaryId
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries, deleteDiary, createNewDiary, clearCreatedDiaryId})
)(DiaryListContainer);
