import React from "react";
import {Typography} from "antd";
import ReactPlayer from "react-player";
import css from "./Therapy.module.css";

const {Title} = Typography;

const Therapy = () => {

    return (
        <div className={css.therapy}>
            <Title> This is Therapy </Title>
            <div>
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