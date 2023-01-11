import React from "react";
import {Button, Space, Upload} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import {TaskContentType} from "../../../../redux/task-content-list-reducer";
import ReactPlayer from "react-player";


type MapStatePropsType = {
    taskContent: TaskContentType
}

type MapDispatchPropsType = {
    onUploadVideo: (file: File) => void
    onDeleteVideo: () => void
}

type TaskContentVideoComponentType = MapStatePropsType & MapDispatchPropsType

const TaskContentVideoComponent: React.FC<TaskContentVideoComponentType> = ({taskContent, onUploadVideo, onDeleteVideo}) => {

    const dummyRequest = ({file, onSuccess = null}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

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

            <div>
                <Space>
                    <Upload
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}>

                        <Button icon={<UploadOutlined/>}>{ taskContent.fileUri ? 'Upload new' : 'Upload video' }</Button>
                    </Upload>
                    {taskContent.fileUri && (
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