import React from "react";
import {Button, Form, Input, Typography} from "antd";
import {PlaySquareOutlined} from "@ant-design/icons";
import {TaskContentType} from "../../../../redux/task-content-list-reducer";

const {Title} = Typography;

type NewTaskContentFormType = {
    createTaskContent: (taskContent: TaskContentType) => void
}

const NewTaskContentForm: React.FC<NewTaskContentFormType> = ({createTaskContent}) => {
    const [form] = Form.useForm()

    const onFinish = (taskContent: TaskContentType) => {
        createTaskContent(taskContent)
        form.resetFields()
    };

    return (
        <div>
            <Title level={5}>Create new task</Title>
            <Form
                size={'middle'}
                form={form}
                name="newTaskContentForm"
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
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please set title!',
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


export default NewTaskContentForm;