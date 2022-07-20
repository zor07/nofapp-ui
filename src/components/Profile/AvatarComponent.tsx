import React, {useEffect, useState} from "react";
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";


const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

type MapStatePropsType = {
    userId: string
    url: string
}

type MapDispatchPropsType = {
    uploadAvatar: (userId: string, file: File) => void
}

type AvatarComponentType = MapStatePropsType & MapDispatchPropsType

const AvatarComponent: React.FC<AvatarComponentType> = ({url, userId, uploadAvatar}) => {

    const [loading, setLoading] = useState(false);
    // const [imageUrl, setImageUrl] = useState(url);
    const [file, setFile] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (file) {
            dispatch(uploadAvatar(userId, file))
            setFile(null)
        }
    }, [file])

    const dummyRequest = ({ file, onSuccess = null }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setLoading(false);
            setFile(info.file.originFileObj)
            // setImageUrl(url);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={dummyRequest}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {url ? (
                <img
                    src={url}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
}

export default AvatarComponent