import React from "react";
import {Button, Space, Typography, Upload} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import ReactPlayer from "react-player";
import {TaskType} from "../../redux/tasks-reducer";
import css from './Levels.module.css'


type MapStatePropsType = {
    task: TaskType
}

type MapDispatchPropsType = {
    onUploadVideo: (file: File) => void
    onDeleteVideo: () => void
}

type TaskContentVideoComponentType = MapStatePropsType & MapDispatchPropsType

const TaskContentVideoComponent: React.FC<TaskContentVideoComponentType> = ({task, onUploadVideo, onDeleteVideo}) => {

    const dummyRequest = ({file, onSuccess = null}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const {Title} = Typography;

    const beforeUpload = (file): boolean => {
        // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        //
        // if (!isJpgOrPng) {
        //     message.error('You can only upload JPG/PNG file!');
        // }
        //
        // const isLt2M = file.size / 1024 / 1024 < 5;
        //
        // if (!isLt2M) {
        //     message.error('Image must smaller than 5MB!');
        // }
        //
        // return isJpgOrPng && isLt2M;
        return true
    };

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            onUploadVideo(info.file.originFileObj)
        }
    };

    return (
        <div>

            {task.fileUri && (
                <div className={css.video}>
                    <Title level={5}>Task video: </Title>
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
                </div>
            )}

            <div>
                <Space>
                    <Upload
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}>

                        <Button icon={<UploadOutlined/>}>{ task.fileUri ? 'Upload new' : 'Upload video' }</Button>
                    </Upload>
                    {task.fileUri && (
                        <div>
                            <Button danger icon={<DeleteOutlined/>}
                                    onClick={() => onDeleteVideo()}>
                                Remove
                            </Button>

                        </div>

                    )}
                </Space>
            </div>


        </div>
    );
}

export default TaskContentVideoComponent