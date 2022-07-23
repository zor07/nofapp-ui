import React, {useEffect, useState} from "react"
import {Button, Divider} from "antd";
import EditorReadView from "../../Editor/EditorReadView";
import {RemirrorJSON} from "remirror";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";

type MapStatePropsType = {
    post: RemirrorJSON
    noteId: string
    userId: string
}

type MapDispatchPropsType = {
    deleteUserPost: (userId: string, noteId: string) => void
}


const UserPost : React.FC<MapStatePropsType & MapDispatchPropsType> = ({post, noteId, userId, deleteUserPost}) => {
    const dispatch = useDispatch()
    const [shouldDeletePost, setShouldDeletePost] = useState(false)

    useEffect(() => {
        if (shouldDeletePost) {
            dispatch(deleteUserPost(userId, noteId))
            setShouldDeletePost(false)
        }
    }, [shouldDeletePost])


    return (
        <div>
            <Divider/>
            <EditorReadView  data={post}
                             displayTitle={true}/>
            <Button danger icon={<DeleteOutlined/>} onClick={() => setShouldDeletePost(true)}/>
        </div>
    )
}

export default UserPost