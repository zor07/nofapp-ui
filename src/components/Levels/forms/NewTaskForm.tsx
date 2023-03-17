import React from "react";
import {Form, FormInstance, Input} from "antd";
import {TaskType} from "../../../redux/tasks-reducer";
import {LevelType} from "../../../redux/levels-reducer";


type NewTaskFormType = {
    task: TaskType | null
    level: LevelType | null
    handleSubmit: (task: TaskType) => void
    form: FormInstance<TaskType>
}

const NewTaskForm: React.FC<NewTaskFormType> = ({task, level, handleSubmit, form}) => {

    return (
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
            onFinish={handleSubmit}
            autoComplete="off">
            <Form.Item
                label="Id"
                name="id"
                initialValue={task && task.id}
                hidden={true}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Level"
                name="level"
                initialValue={level && level}
                hidden={true}>
                <Input/>
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                initialValue={task && task.name}
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
                initialValue={task && task.description}
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
                initialValue={task && task.order}
                rules={[
                    {
                        required: true,
                        message: 'Please set order!',
                    },
                ]}>
                <Input type={'number'}/>
            </Form.Item>
        </Form>
    );
}


export default NewTaskForm;