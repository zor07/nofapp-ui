import React, {useEffect, useState} from "react"
import {deleteRelapseLog, RelapseLog} from "../../../redux/profile-reducer";
import {Popconfirm, Table, Typography} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";


type MapStatePropsType = {
    userId: string
    relapseLogs: Array<RelapseLog>
}

type MapDispatchPropsType = {
    deleteRelapseLog: (userId: string, relapseLogId: string) => void
}

const RelapseLogTable: React.FC<MapStatePropsType & MapDispatchPropsType> = ({userId, relapseLogs}) => {
    const datasource = relapseLogs
    const {Title} = Typography;
    const dispatch = useDispatch()
    const [toDeleteRelapseLog, setToDeleteRelapseLog] = useState(null)

    useEffect(() => {
        if (toDeleteRelapseLog) {
            dispatch(deleteRelapseLog(userId, toDeleteRelapseLog))
            setToDeleteRelapseLog(null)
        }
    }, [toDeleteRelapseLog])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start'
        },
        {
            title: 'Stop',
            dataIndex: 'stop',
            key: 'stop'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record: RelapseLog) => (
                <Popconfirm placement="right"
                            title={`Are you shure you want to this log ?`}
                            onConfirm={() => setToDeleteRelapseLog(record.id)}
                            okText="Yes"
                            cancelText="No">
                    <DeleteOutlined/>
                </Popconfirm>
            )
        }
    ]

    return (
        <div>
            {
                datasource && datasource.length > 0 &&
                <Table dataSource={datasource}
                       columns={columns}
                       title={() => <Title> Relapse Log </Title>}
                />
            }

        </div>
    )
}

export default RelapseLogTable