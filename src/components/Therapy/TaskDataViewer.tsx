import React from "react";
import {Button, Typography} from "antd";
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

const {Title} = Typography;


const TaskDataViewer: React.FC<TaskContentViewerPropsType> = ({userTask, onFinishTask,  onOpenTaskList}) => {

    const task = userTask ? userTask.task : null
    const uncompleted = !userTask.completed

    const hasData = task ? task.data || task.fileUri : false
    return (
        <div className={css.taskContent}>
            {hasData && (
                <div>
                    {task.data && (
                        <EditorReadView data={task.data} displayTitle={true}/>
                    )}
                    {task.fileUri && (
                        <ReactPlayer
                            // playing={showVideo}
                            className='react-player'
                            url={[
                                {
                                    src: task.fileUri,
                                    type: "video/mp4"
                                },
                            ]}
                            controls={true}/>
                    )}


                        <div className={css.buttons}>
                            {uncompleted &&
                                <Button  onClick={() => onFinishTask()}>Finish Task</Button>
                            }
                            <Button onClick={() => onOpenTaskList()} >Select Task</Button>
                        </div>

                </div>
            )}
        </div>
    )
}

export default TaskDataViewer