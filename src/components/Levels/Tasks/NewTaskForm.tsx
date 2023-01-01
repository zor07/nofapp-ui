import React from "react";
import {Button, Form, Input, Typography} from "antd";
import {PlaySquareOutlined} from "@ant-design/icons";
import {TaskType} from "../../../redux/tasks-reducer";

const {Title} = Typography;

type NewLevelFormType = {
    createTask: (task: TaskType) => void
}

const NewLevelForm: React.FC<NewLevelFormType> = ({createTask}) => {
    const [form] = Form.useForm()

    const onFinish = (task: TaskType) => {
        createTask(task)
        form.resetFields()
    };

    return (
        <div>
            <Title level={5}>Create new level</Title>
            <Form
                size={'middle'}
                form={form}
                name="newTaskForm"
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
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please set description!',
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
                        Create task
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}


export default NewLevelForm;