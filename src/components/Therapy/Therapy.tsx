import React from "react";
import {PageHeader, Typography} from "antd";
import ReactPlayer from "react-player";
import css from "./Therapy.module.css";
import {TaskContentType} from "../../redux/task-content-list-reducer";

const {Title} = Typography;

type MapStatePropsType = {
    taskContentList: Array<TaskContentType>
}

type MapDispatchPropsType = {}

type OwnPropsType = {}

type LevelsListContainerPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const Therapy: React.FC<LevelsListContainerPropsType> = ({taskContentList}) => {

    console.log(taskContentList)

    return (
        <div className={css.therapy}>
            <PageHeader title='This is Therapy' />
            <div>
                <Title>Length is: {taskContentList ? taskContentList.length : 0}</Title>


                <ReactPlayer
                    // playing={showVideo}
                    className='react-player'
                    url={[
                        {
                            src: "http://127.0.0.1:9000/video/Sample-Video-File-For-Testing.mp4",
                            type: "video/mp4"
                        },
                    ]}
                    controls={true}/>
            </div>
        </div>
    )

}

export default Therapy