import React from "react";
import {TaskContentType} from "../../redux/task-content-list-reducer";
import {Typography} from "antd";
import ReactPlayer from "react-player";
import EditorReadView from "../Editor/EditorReadView";

type MapStatePropsType = {
    taskContent: TaskContentType
}
type MapDispatchPropsType = {}
type OwnPropsType = {}

type TaskContentViewerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const {Title} = Typography;

const TaskContentViewer: React.FC<TaskContentViewerPropsType> = ({taskContent}) => {

    const hasData = taskContent.data || taskContent.fileUri
    return (
        <div>
            {hasData && (
                <div>
                    {taskContent.data && (
                        <EditorReadView data={taskContent.data} displayTitle={true}/>
                    )}

                    {taskContent.fileUri && (
                        <ReactPlayer
                            // playing={showVideo}
                            className='react-player'
                            url={[
                                {
                                    src: taskContent.fileUri,
                                    type: "video/mp4"
                                },
                            ]}
                            controls={true}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default TaskContentViewer