// import React from "react";
// import {Button, PageHeader, Space} from "antd";
// import css from "./Therapy.module.css";
// import {TaskContentType} from "../../redux/task-content-list-reducer";
// import TaskDataViewer from "./TaskDataViewer";
// import {TaskType} from "../../redux/tasks-reducer";
//
//
// type MapStatePropsType = {
//     selectedUserTask: TaskType
//     currentUserTask: TaskType
//     taskContentList: Array<TaskContentType>
// }
//
// type MapDispatchPropsType = {
//     nextTask: () => void
//     prevTask: () => void
//     currTask: () => void
// }
//
// type OwnPropsType = {}
//
// type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
//
// const Therapy: React.FC<LevelsListContainerPropsType> = ({
//     selectedUserTask,
//     currentUserTask,
//     taskContentList,
//     prevTask,
//     nextTask,
//     currTask
// }) => {
//
//     const taskContentElements = taskContentList.map((taskContent, index) => (
//         <TaskDataViewer key={index} taskContent={taskContent}/>
//     ))
//
//     const showNextLevelButton = selectedUserTask !== currentUserTask
//     const showFinishLevelButton = selectedUserTask === currentUserTask
//     const showPrevLevelButton = true //todo impliment logic for this
//
//     return (
//         <div className={css.therapy}>
//             <PageHeader title='Therapy'/>
//             {taskContentElements}
//             <Space>
//                 {showFinishLevelButton &&
//                     <Button type={"primary"}
//                             onClick={() => currTask()}>
//                         Finish Level
//                     </Button>
//                 }
//
//                 {showPrevLevelButton &&
//                     <Button onClick={() => prevTask()}>
//                         Prev Level
//                     </Button>
//                 }
//
//                 {showNextLevelButton &&
//                     <Button onClick={() => nextTask()}>
//                         Next Level
//                     </Button>
//                 }
//             </Space>
//         </div>
//     )
//
// }
//
// export default Therapy