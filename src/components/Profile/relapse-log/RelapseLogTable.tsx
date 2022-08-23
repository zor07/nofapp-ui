import React from "react"
import {RelapseLog} from "../../../redux/profile-reducer";
import {Table} from "antd";


type MapStatePropsType = {
    relapseLogs: Array<RelapseLog>
}

type MapDispatchPropsType = {}

const RelapseLogTable: React.FC<MapStatePropsType & MapDispatchPropsType> = ({relapseLogs}) => {
    const datasource = relapseLogs
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
        }
    ]

    return (
        <div>
            <Table dataSource={datasource} columns={columns} />
        </div>
    )
}

export default RelapseLogTable