import React, { useState } from "react";
import { Container, Button, Form, Card, Message } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import renderField from "../credit/components/subComponents/formFields/renderField";
import renderPasswordField from "../credit/components/subComponents/formFields/renderPasswordField";
import { normalizePhone, isEmail } from "../../utils/Utils";

import { Link, useHistory } from "react-router-dom";
import { validateRegister } from "../../utils/Utils";
import { registerUser } from "../../redux/actions/auth";

import "../../styles/auth.scss";

const Register = () => {
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);

    const state = useSelector((state) => state.form);

    const dispatch = useDispatch();
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        if (state && state.register && state.register.values) {
            if (state.register.values.name.length < 5) {
                setErrors("Please enter a valid Name");
            } else if (!isEmail(state.register.values.email)) {
                setErrors("Must be a valid email address");
            } else if (state.register.values.password !== state.register.values.confirmPassword) {
                setErrors("Password must match");
                setLoading(false);
            } else {
                setErrors("");
                const userData = {
                    name: state.register.values.name,
                    phone: state.register.values.phone,
                    email: state.register.values.email,
                    password: state.register.values.password
                };
                dispatch(registerUser(userData, setLoading, setErrors, history));
            }
        }
    };

    return (
        <div>
            <div className="backdrop">
                <div id="circ">
                    <div id="circle"></div>
                    <div id="circle-two"></div>
                </div>
                <Container id="container" textAlign="center">
                    <div className="auth-screen-wrapper">
                        <div className="logo">
                            <img src="/assets/logo-auth.png" alt="Logo" />
                        </div>
                        <Card fluid color="lightblue" className="card">
                            <Card.Content>
                                <Card.Description>
                                    <Form style={{ padding: "30px" }} size="small">
                                        {errors ? (
                                            <Message negative header="Error Signing Up.." content={errors} />
                                        ) : (
                                            ""
                                        )}
                                        <div>
                                            <Field
                                                type="text"
                                                name="name"
                                                label="Full Name"
                                                component={renderField}
                                                id="suffix"
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <Field
                                                type="text"
                                                name="phone"
                                                label="Phone Number"
                                                component={renderField}
                                                normalize={normalizePhone}
                                                id="suffix"
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <Field
                                                type="text"
                                                name="email"
                                                label="Email"
                                                component={renderField}
                                                id="suffix"
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <Field
                                                type="text"
                                                name="password"
                                                label="Password"
                                                component={renderPasswordField}
                                            />
                                        </div>
                                        <br />
                                        <div>
                                            <Field
                                                type="text"
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                component={renderPasswordField}
                                            />
                                        </div>
                                        <br />
                                        <div className="incomes">
                                            <div>
                                                <Button
                                                    onClick={register}
                                                    id="btn"
                                                    positive
                                                    disabled={state && state.register && state.register.syncErrors}
                                                >
                                                    {loading ? "Loading..." : "  Sign up"}
                                                </Button>
                                            </div>
                                            <div>
                                                <Link to="/login">
                                                    <Button id="btn-outline" basic color="green">
                                                        Login
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Form>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default reduxForm({
    form: "register",
    destroyOnUnmount: false,
    validate: validateRegister
})(Register);
