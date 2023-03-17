// import React, {useEffect, useState} from 'react';
// import {connect, useDispatch} from "react-redux";
// import {AppDispatch, AppStateType} from "../../redux/redux-store";
// import {compose} from "redux";
// import {withAuthRedirect} from "../../hoc/withAuthRedirect";
// import css from './Therapy.module.css'
// import {TaskContentType} from "../../redux/task-content-list-reducer";
// import {
//     getTaskContentListForUser,
//     finishCurrentTask,
//     getCurrentUserTask,
//     getNextTask, getPrevTask
// } from "../../redux/therapy-reducer";
// import Therapy from "./Therapy";
// import {TaskType} from "../../redux/tasks-reducer";
//
//
// type MapStatePropsType = {
//     currentUserTask: TaskType
//     selectedUserTask: TaskType
//     taskContentList: Array<TaskContentType>
// }
//
// type MapDispatchPropsType = {
//     getCurrentUserTask: () => void
//     getNextTask: (task: TaskType) => void
//     getPrevTask: (task: TaskType) => void
//     finishCurrentTask: () => void
// }
//
// type OwnPropsType = {}
//
// type TherapyContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
//
// const TherapyContainer: React.FC<TherapyContainerPropsType> = ({currentUserTask, selectedUserTask, taskContentList}) => {
//     const dispatch = useDispatch<AppDispatch>()
//     const [shouldGetNextTask, setShouldGetNextTask] = useState(false)
//     const [shouldGetPrevTask, setShouldGetPrevTask] = useState(false)
//     const [shouldFinishCurrentTask, setShouldFinishCurrentTask] = useState(false)
//
//
//     useEffect(() => {
//         if (selectedUserTask === null) {
//             dispatch(getCurrentUserTask())
//         }
//
//     }, [])
//
//     useEffect(() => {
//         if (selectedUserTask === null) {
//             dispatch(getCurrentUserTask())
//         }
//
//     }, [selectedUserTask])
//
//
//     useEffect(() => {
//         if (shouldGetNextTask) {
//             dispatch(getNextTask(selectedUserTask))
//                 .then(() => setShouldGetNextTask(false))
//         }
//     }, [shouldGetNextTask])
//
//     useEffect(() => {
//         if (shouldGetPrevTask) {
//             dispatch(getPrevTask(selectedUserTask))
//                 .then(() => setShouldGetPrevTask(false))
//         }
//     }, [shouldGetPrevTask])
//
//     useEffect(() => {
//         if (shouldFinishCurrentTask) {
//             dispatch(finishCurrentTask())
//                 .then(() => setShouldFinishCurrentTask(false))
//         }
//     }, [shouldFinishCurrentTask])
//
//     taskContentList.sort((a, b) => a.order - b.order)
//
//     const nextTask = () => setShouldGetNextTask(true)
//     const prevTask = () => setShouldGetPrevTask(true)
//     const currTask = () => setShouldFinishCurrentTask(true)
//
//     return (
//         <div className={css.content}>
//             <Therapy selectedUserTask={selectedUserTask}
//                      currentUserTask={currentUserTask}
//                      taskContentList={taskContentList}
//                      nextTask={nextTask}
//                      prevTask={prevTask}
//                      currTask={currTask}
//             />
//         </div>
//     )
// }
//
//
// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         currentUserTask: state.therapy.currentUserTask,
//         selectedUserTask: state.therapy.selectedUserTask,
//         taskContentList: state.therapy.taskContentList,
//     }
// }
//
// export default compose(
//     withAuthRedirect,
//     connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
//         getCurrentUserTask, getNextTask, getPrevTask,  finishCurrentTask
//     })
// )(TherapyContainer);
