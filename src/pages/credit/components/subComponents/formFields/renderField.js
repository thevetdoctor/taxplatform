import React from "react";

import { Input, Form } from "semantic-ui-react";

import "../../../../../styles/form.scss";

const renderField = ({ input, label, width, type, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <div>
                <Form.Field
                    control={Input}
                    width={width}
                    labe={label}
                    placeholder={label === "Birth Date" ? "MM/DD/YYYY" : label}
                    {...input}
                    type={type}
                    id={touched && error ? "form-width-error" : "form-width"}
                    required
                />
            </div>
            <div>{touched && error && <span id="error">{error}</span>}</div>
        </div>
    );
};

export default renderField;
