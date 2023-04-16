import React, {useEffect} from "react";
import {connect} from "react-redux";
import {register} from "../../redux/auth-reducer";
import {useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import {Button, Form, Input, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";


type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    register: (username: string, name: string, password: string) => void
}

type RegisterPropsType = MapStateToPropsType & MapDispatchToPropsType

type RegisterValuesType = {
    username: string
    name: string
    password: string
}

const Register: React.FC<RegisterPropsType>= ({isAuth, register}) => {
    const [form] = Form.useForm()
    const {Title} = Typography;
    const navigate = useNavigate();

    const onFinish = (values: RegisterValuesType) => {
        register(values.username, values.name, values.password)
        form.resetFields()
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    })

    return (
        <div>
            <Title level={1}>Register</Title>
            <Form
                title={'Register'}
                size={'middle'}
                form={form}
                name="registerForm"
                layout={'horizontal'}
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 4,
                }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {register})(Register);
