import React from "react";
import {TaskContentType} from "../../redux/task-content-list-reducer";
import {Typography} from "antd";
import ReactPlayer from "react-player";
import EditorReadView from "../Editor/EditorReadView";
import css from './Therapy.module.css'

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
        <div className={css.taskContent}>
            {hasData && (
                <div>

                    <Title level={5}>{taskContent.title}</Title>

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