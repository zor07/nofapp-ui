import React from "react";
import {TimerFormDataType} from "../../redux/timer-reducer";
import {Button, DatePicker, Form, Input} from "antd";
import {Typography} from 'antd';
import {PlaySquareOutlined} from "@ant-design/icons";

const {Title} = Typography;

type TimerFormType = {
    startTimer: (timerData: TimerFormDataType) => void
}

const TimerForm: React.FC<TimerFormType> = ({startTimer}) => {
    const [form] = Form.useForm()

    const onFinish = (timerData: TimerFormDataType) => {
        startTimer(timerData)
        form.resetFields()
    };

    return (
        <div>
            <Title level={5}>Start new timer</Title>
            <Form
                size={'middle'}
                form={form}
                name="timerForm"
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
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please add description!',
                        },
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Start from"
                    name="start"
                    rules={[
                        {
                            required: true,
                            message: 'Please select time from!',
                        },
                    ]}>
                    <DatePicker showTime/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 10,
                    }}>
                    <Button icon={<PlaySquareOutlined />} type="primary" htmlType="submit">
                        Start timer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}


export default TimerForm;