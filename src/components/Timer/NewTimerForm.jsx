import React from "react";
import {Field, Form} from "react-final-form";
import {FieldDatePicker, Input} from "../Common/FormControls/FormControls";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css"
import {required} from "../../utils/validators/validators";
import css from './Timer.module.css'

const NewTimerForm = () => {

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <div className={css.newTimerForm}>
            <h3>Create new timer: </h3>
            <Form onSubmit={onSubmit}>
                {({handleSubmit, pristine, form, submitting, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field component={Input}
                                   name={'description'}
                                   placeholder={'Description'}
                                   validate={required}
                            />
                        </div>
                        <div>
                            {!values.fromNow &&
                            <Field
                                component={FieldDatePicker}
                                name="date_till"
                                placeholder="YYYY/MM/DD"
                            />
                            }
                        </div>
                        <div>
                            <label>From now</label>
                            <Field component={Input}
                                   type={'checkbox'}
                                   name={'fromNow'}
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={submitting || pristine}>
                                Start
                            </button>
                        </div>
                    </form>
                )}
            </Form>
        </div>
    )
}


export default NewTimerForm;