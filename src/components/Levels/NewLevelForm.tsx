import React from "react";
import {Form, FormInstance, Input} from "antd";
import {LevelType} from "../../redux/levels-reducer";


type NewLevelFormType = {
    level: LevelType | null
    handleSubmit: (level: LevelType) => void
    form: FormInstance<LevelType>
}

const NewLevelForm: React.FC<NewLevelFormType> = ({form, level, handleSubmit}) => {

    return (
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
            onFinish={handleSubmit}
            autoComplete="off">
            <Form.Item
                label="Id"
                name="id"
                initialValue={level && level.id}
                hidden={true}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                initialValue={level && level.name}
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
                initialValue={level && level.order}
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


export default NewLevelForm;