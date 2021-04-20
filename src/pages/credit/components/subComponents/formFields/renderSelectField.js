import React from "react";
import { Select, Form } from "semantic-ui-react";

import "../../../../../styles/form.scss";

const renderSelectField = ({ input, label, width, option, type, meta: { touched, error } }) => {
    return (
        <div>
            <div>
                <Form.Field
                    control={Select}
                    width={width}
                    options={option}
                    labe={label}
                    {...input}
                    placeholder={label}
                    onChange={(param, data) => input.onChange(data.value)}
                    type={type}
                    id={touched && error ? "form-width-error" : "form-width"}
                    required
                />
            </div>
            <div>{touched && error && <span id="error">{error}</span>}</div>
        </div>
    );
};

export default renderSelectField;
