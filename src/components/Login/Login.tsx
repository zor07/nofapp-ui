import React, {useEffect} from "react";
import {Form, Field} from "react-final-form";
import {Input} from "../Common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";



type MapStateToPropsType = {
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (username: string, password: string) => void
}

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType


const Login: React.FC<LoginPropsType>= ({isAuth, login}) => {

    const navigate = useNavigate();
    const onSubmit = (values) => {
        login(values.username, values.password)
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    })

    return (
        <div>
            <h1>LOGIN</h1>
            <Form onSubmit={onSubmit} >
                {({handleSubmit, pristine, form, submitting}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field component={Input}
                                   name={'username'}
                                   placeholder={'Username'}
                                   validate={required}
                            />
                        </div>
                        <div>
                            <Field component={Input}
                                   name={'password'}
                                   placeholder={'Password'}
                                   validate={required}
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
