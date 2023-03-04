import React from "react";
import {PageHeader} from "antd";
import css from "./Therapy.module.css";
import {TaskContentType} from "../../redux/task-content-list-reducer";
import TaskContentViewer from "./TaskContentViewer";


type MapStatePropsType = {
    taskContentList: Array<TaskContentType>
}

type MapDispatchPropsType = {}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Therapy: React.FC<LevelsListContainerPropsType> = ({taskContentList}) => {

    const taskContentElements = taskContentList.map((taskContent, index) => (
        <TaskContentViewer key={index} taskContent={taskContent}/>
    ))

    return (
        <div className={css.therapy}>
            <PageHeader title='Therapy' />
            {taskContentElements}
        </div>
    )

}

export default Therapy