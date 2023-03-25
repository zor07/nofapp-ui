import React from "react";
import {Button, Space} from "antd";
import ReactPlayer from "react-player";
import EditorReadView from "../Editor/EditorReadView";
import css from './Therapy.module.css'
import {UserTaskType} from "../../redux/user-progress-reducer";

type MapStatePropsType = {
    userTask: UserTaskType
}
type MapDispatchPropsType = {
    onFinishTask: () => void
    onOpenTaskList: () => void
}

type OwnPropsType = {}

type TaskContentViewerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const TaskDataViewer: React.FC<TaskContentViewerPropsType> = ({userTask, onFinishTask,  onOpenTaskList}) => {

    return (
        <div className={css.taskContent}>
            <div>
                <EditorReadView data={userTask.task.data} displayTitle={true}/>
            </div>
            <div>
                {userTask.task.fileUri && (
                        <ReactPlayer
                            // playing={showVideo}
                            className='react-player'
                            url={[
                                {
                                    src: userTask.task.fileUri,
                                    type: "video/mp4"
                                },
                            ]}
                            controls={true}/>
                    )}
            </div>
            <Space className={css.buttons}>
                {!userTask.completed &&
                    <Button onClick={() => onFinishTask()}>Finish Task</Button>
                }

                <Button onClick={() => onOpenTaskList()}>Show task list</Button>
            </Space>

        </div>
    )
}

export default TaskDataViewer