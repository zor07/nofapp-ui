import React from "react";
import {Button, Typography} from "antd";
import ReactPlayer from "react-player";
import EditorReadView from "../Editor/EditorReadView";
import css from './Therapy.module.css'
import {UserTaskType} from "../../redux/user-progress-reducer";

type MapStatePropsType = {
    userTask: UserTaskType
}
type MapDispatchPropsType = {}
type OwnPropsType = {}

type TaskContentViewerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const {Title} = Typography;


const TaskDataViewer: React.FC<TaskContentViewerPropsType> = ({userTask}) => {

    const task = userTask ? userTask.task : null
    const uncompleted = !userTask.completed

    const hasData = task ? task.data || task.fileUri : false
    return (
        <div className={css.taskContent}>
            {hasData && (
                <div>

                    <Title level={5}>{task.name}</Title>

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

                    {uncompleted &&
                        <Button>Finish Task</Button>
                    }
                </div>
            )}
        </div>
    )
}

export default TaskDataViewer