import React, {useEffect, useState} from "react";
import {createNotebook, deleteNotebook, NotebookType, requestNotebooks} from "../../redux/notebook-reducer";
import {Button, Card, Col, Divider, Popconfirm, Row, Typography} from "antd";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import css from "./Notebooks.module.css";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {DeleteOutlined} from "@ant-design/icons";
import NotebookForm from "./NotebookForm";


type MapStatePropsType = {
    notebooks: Array<NotebookType>
}

type MapDispatchPropsType = {
    requestNotebooks: () => void
    deleteNotebook: (notebookId: string) => void
    createNotebook: (notebook: NotebookType) => void
}

type NotebookListContainerType = MapStatePropsType & MapDispatchPropsType

const NotebookListContainer: React.FC<NotebookListContainerType> = (props) => {
    const {Title} = Typography;
    const [deleteNotebookId, setDeleteNotebookId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
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

    const notebookCards = props.notebooks.map(notebook => {
        return (
            <Col span={5} key={notebook.id}>
                <div className={css.notebookCard}>
                    <Card title={<Title level={5}>{notebook.name}</Title>}
                          style={{width: 250}}
                          actions={[
                              <Popconfirm placement="right"
                                          title={`Are you shure you want to delete [${notebook.name}] ?`}
                                          onConfirm={() => onDeleteNotebook(notebook.id)}
                                          okText="Yes"
                                          cancelText="No">
                                  <Button danger icon={<DeleteOutlined/>}/>
                              </Popconfirm>
                          ]}>
                        <p>{notebook.description}</p>
                    </Card>
                </div>
            </Col>

        )
    })

    return (
        <div className={css.content}>
            <Title level={3}>Notebooks</Title>

            <Row justify="start">
                {notebookCards}
            </Row>

            {(notebookCards.length > 0) &&
                <Divider/>
            }

            <Row justify="start">
                <Col span={12}>
                    <NotebookForm createNotebook={createNotebook} />
                </Col>
            </Row>
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
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        requestNotebooks,
        deleteNotebook,
        createNotebook
    })
)(NotebookListContainer);