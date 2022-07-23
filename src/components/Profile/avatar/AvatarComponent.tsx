import React, {useEffect, useState} from "react";
import {Avatar, Button, message, Space, Upload} from 'antd';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import css from "./Avatar.module.css"


type MapStatePropsType = {
    userId: string
    url: string
}

type MapDispatchPropsType = {
    uploadAvatar: (userId: string, file: File) => void
    removeAvatar: (userId: string) => void
}

type AvatarComponentType = MapStatePropsType & MapDispatchPropsType

const AvatarComponent: React.FC<AvatarComponentType> = ({url, userId, uploadAvatar, removeAvatar}) => {

    const [file, setFile] = useState()
    const [shouldRemoveAvatar, setShouldRemoveAvatar] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (file) {
            dispatch(uploadAvatar(userId, file))
            setFile(null)
        }
    }, [file])

    useEffect(() => {
        if (shouldRemoveAvatar) {
            dispatch(removeAvatar(userId))
            setShouldRemoveAvatar(false)
        }
    }, [shouldRemoveAvatar])

    const dummyRequest = ({file, onSuccess = null}) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isLt2M) {
            message.error('Image must smaller than 5MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            setFile(info.file.originFileObj)
        }
    };

    return (
        <div>

            {url && (
                <Avatar src={url}
                        className={css.avatar}
                        shape="square"
                        draggable={true}/>
            )}

            <div>
                <Space>
                    <Upload
                        showUploadList={false}
                        customRequest={dummyRequest}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}>

                        <Button icon={<UploadOutlined/>}>{ url ? 'Upload' : 'Upload avatar' }</Button>
                    </Upload>
                    {url && (
                        <Button danger icon={<DeleteOutlined/>}
                                onClick={() => setShouldRemoveAvatar(true)}>
                            Remove
                        </Button>

                    )}
                </Space>
            </div>


        </div>
    );
}

export default AvatarComponent