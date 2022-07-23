import React from "react"
import {Button, Divider} from "antd";
import EditorReadView from "../../Editor/EditorReadView";
import {RemirrorJSON} from "remirror";
import {DeleteOutlined} from "@ant-design/icons";

type MapStatePropsType = {
    post: RemirrorJSON
    noteId: string
}

type MapDispatchPropsType = {
}


const UserPost : React.FC<MapStatePropsType & MapDispatchPropsType> = ({post, noteId}) => {
    return (
        <div>
            <Divider/>
            <EditorReadView  data={post}
                             displayTitle={true}/>
            <Button danger icon={<DeleteOutlined/>}/>
        </div>
    )
}

export default UserPost