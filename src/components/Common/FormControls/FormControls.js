import css from './FormControls.module.css'
import DatePicker from "react-datepicker";
import React from "react";

const FormControl = (props) => {
    const hasError = props.meta.touched && props.meta.error;
    return (
        <div className={css.formControl + " " + (hasError ? css.error : "")}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span>{props.meta.error}</span>}
            </div>
        </div>
    )
}

export const FieldDatePicker = ({input, placeholder, minDate, maxDate}) => (
    <DatePicker
        className="plus-icon"
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect
        selected={input.value || null}
        onChange={input.onChange}
        minDate={minDate}
        maxDate={maxDate}
        disabledKeyboardNavigation
        placeholderText={placeholder}
    />
);

export const Textarea = (props) => {
    return <FormControl {...props}><textarea {...props.input} {...props} /></FormControl>
}

export const Input = (props) => {
    return <FormControl {...props}><input {...props.input} {...props} /></FormControl>
}


