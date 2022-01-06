import React from "react";
import {Form, Field} from "react-final-form";
import {Input} from "../Common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";

const Login = (props) => {

    const onSubmit = (values) => {
        console.log(values)
    }

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

export default Login;
