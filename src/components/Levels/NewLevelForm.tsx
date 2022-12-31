import React from "react";
import {Button, Form, Input} from "antd";
import {Typography} from 'antd';
import {PlaySquareOutlined} from "@ant-design/icons";
import {LevelType} from "../../redux/levels-reducer";

const {Title} = Typography;

type NewLevelFormType = {
    createLevel: (level: LevelType) => void
}

const NewLevelForm: React.FC<NewLevelFormType> = ({createLevel}) => {
    const [form] = Form.useForm()

    const onFinish = (level: LevelType) => {
        createLevel(level)
        form.resetFields()
    };

    return (
        <div>
            <Title level={5}>Create new level</Title>
            <Form
                size={'middle'}
                form={form}
                name="newLevelForm"
                layout={'horizontal'}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please set name!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Order"
                    name="order"
                    rules={[
                        {
                            required: true,
                            message: 'Please set order!',
                        },
                    ]}>
                    <Input type={'number'}/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 10,
                    }}>
                    <Button icon={<PlaySquareOutlined />} type="primary" htmlType="submit">
                        Create level
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}


export default NewLevelForm;