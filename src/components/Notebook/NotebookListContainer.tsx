import React, {useEffect, useState} from "react";
import {deleteNotebook, NotebookType, requestNotebooks} from "../../redux/notebook-reducer";
import {Button, List, Popconfirm, Typography} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from "../Diary/Diary.module.css";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";


type MapStatePropsType = {
    notebooks: Array<NotebookType>
}

type MapDispatchPropsType = {
    requestNotebooks: () => void
    deleteNotebook: (notebookId: string) => void
}

type NotebookListContainerType = MapStatePropsType & MapDispatchPropsType

const NotebookListContainer: React.FC<NotebookListContainerType> = (props) => {
    const {Title} = Typography;
    const [deleteNotebookId, setDeleteNotebookId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("requesting diaries")
        dispatch(requestNotebooks())
    }, [])

    useEffect(() => {
        if (deleteNotebookId !== '') {
            dispatch(deleteNotebook(deleteNotebookId))
            setDeleteNotebookId('')
        }
    }, [deleteNotebookId])

    const onDeleteNotebook = (notebookId: string) => {
        setDeleteNotebookId(notebookId)
    }

    return (
        <div className={css.content}>
            <Title level={3}>Notebooks</Title>
            <List itemLayout={'vertical'}
                  size={'large'}
                  pagination={{
                      onChange: page => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  footer={
                      <div>
                          <Button>
                              Create new notebook
                          </Button>
                      </div>
                  }
                  dataSource={props.notebooks}
                  renderItem={item => (
                      <List.Item key={item.id}
                                 actions={[
                                     <Popconfirm placement="right"
                                                 title={`Are you shure you want to delete [${item.name}] ?`}
                                                 onConfirm={() => onDeleteNotebook(item.id)}
                                                 okText="Yes"
                                                 cancelText="No">
                                         <Button danger icon={<DeleteOutlined/>}> Delete </Button>
                                     </Popconfirm>
                                 ]}>
                          <Title level={5}>{item.name}</Title>
                          <div>{item.description}</div>

                      </List.Item>

                  )}/>
        </div>
    )
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        notebooks: state.notebooks.notebooks
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {requestNotebooks, deleteNotebook})
)(NotebookListContainer);