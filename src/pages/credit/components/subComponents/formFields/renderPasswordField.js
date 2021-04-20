import React, { useState } from "react";
import { Form, Icon, Input } from "semantic-ui-react";

const RenderPasswordField = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordVisible = () => setShowPassword(!showPassword);

  const {
    input,
    label,
    width,
    meta: { touched, error },
  } = props;

  return (
    <div>
      <label>{label}</label>
      <div>
        <Form.Field
          control={Input}
          {...input}
          icon={
            showPassword ? (
              <Icon onClick={passwordVisible} name="eye" link />
            ) : (
              <Icon onClick={passwordVisible} name="eye slash" link />
            )
          }
          placeholder={label}
          width={width}
          type={showPassword ? "text" : "password"}
          labe={label}
          id="form-width"
          required
        />
      </div>
      <div>{touched && error && <span id="error">{error}</span>}</div>
    </div>
  );
};

export default RenderPasswordField;
