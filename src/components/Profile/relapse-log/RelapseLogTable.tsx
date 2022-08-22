import React from "react"
import {RelapseLog} from "../../../redux/profile-reducer";
import {Typography} from "antd";


type MapStatePropsType = {
    relapseLogs: Array<RelapseLog>
}

type MapDispatchPropsType = {}

const RelapseLogTable: React.FC<MapStatePropsType & MapDispatchPropsType> = ({relapseLogs}) => {
    const {Title} = Typography;

    const relapseLogElements = relapseLogs.map((relapseLog) => <tr>
        <td>{relapseLog.id}</td>
        <td>{relapseLog.start}</td>
        <td>{relapseLog.stop}</td>
    </tr>)

    return (
        <div>
            <Title level={1}>
                Relapse Log:
            </Title>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>start</th>
                    <th>stop</th>
                </tr>
                </thead>
                {relapseLogElements}
            </table>
        </div>
    )
}

export default RelapseLogTable