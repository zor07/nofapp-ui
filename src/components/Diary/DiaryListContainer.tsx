import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {deleteDiary, DiaryIdAndTitleType, requestDiaries} from "../../redux/diaries-reducer";
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {Button, List} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

type MapStatePropsType = {
    diaries: Array<DiaryIdAndTitleType>
}

type MapDispatchPropsType = {
    requestDiaries: () => void
    deleteDiary: (diaryId: string) => void
}

type OwnPropsType = {}

type DiariesContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const DiaryListContainer: React.FC<DiariesContainerPropsType> = (props) => {

    const [deleteDiaryId, setDeleteDiaryId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestDiaries())
    }, [])


    useEffect(() => {
        if (deleteDiaryId !== '') {
            dispatch(deleteDiary(deleteDiaryId))
            setDeleteDiaryId('')
        }
    }, [deleteDiaryId])

    return (
        <div>
            <h2>Diary</h2>
            <List itemLayout="horizontal"
                  size="small"
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
                                         <Button icon={<EditOutlined/>}/>
                                     </NavLink>,
                                     <Button danger icon={<DeleteOutlined/>} onClick={() => setDeleteDiaryId(item.id)}/>
                                 ]}>
                          {item.title}
                      </List.Item>
                  )}/>
            <div>
                <NavLink to={`/diary/editor`}>
                    <Button type="primary">
                        New note
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        diaries: state.diaries.diaries
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestDiaries, deleteDiary})
)(DiaryListContainer);
