import React, { useState, useEffect } from "react";
import { Container, Button, Form, Card, Checkbox, Input, Message, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import renderField from "../credit/components/subComponents/formFields/renderField";
import renderPasswordField from "../credit/components/subComponents/formFields/renderPasswordField";
import { loginUser, resetPassword } from "../../redux";
import { isEmail, validateLogin } from "../../utils/Utils";
import "../../styles/auth.scss";

const Login = () => {
    const [errors, setErrors] = useState(false);
    const [errorsPassword, setErrorsPassword] = useState(false);
    const [successPassword, setSuccessPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("email") ? true : false);
    const [loading, setLoading] = useState(false);
    const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const form = useSelector((state) => state.form);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(change("login", "email", localStorage.getItem("email") || ""));
        dispatch(change("login", "password", localStorage.getItem("password") || ""));
    }, [dispatch]);

    const login = (e) => {
        e.preventDefault();
        if (form && form.login && form.login.values) {
            if (!isEmail(form.login.values.email)) {
                setErrors("Must be a valid email address");
            } else {
                setErrors("");
                const userData = {
                    email: form.login.values.email,
                    password: form.login.values.password
                };
                dispatch(loginUser(userData, setLoading, setErrors, rememberMe));
            }
        }
    };

    const confirmEmail = (e) => {
        e.preventDefault();
        const validEmail = isEmail(email);
        if (!validEmail) {
            setErrorsPassword("Must be a valid email address");
        } else {
            setErrorsPassword(false);
            dispatch(resetPassword({ email }, setLoadingPasswordUpdate, setErrorsPassword, setSuccessPassword));
        }
    };

    return (
        <div>
            <div className="backdrop">
                <div id="circ">
                    <div id="circle"></div>
                    <div id="circle-two"></div>
                </div>
                <Container textAlign="center">
                    <div className="auth-screen-wrapper">
                        <div className="logo">
                            <img src="/assets/logo-auth.png" alt="Logo" />
                        </div>
                        <Card fluid className="card">
                            <Card.Content>
                                <Card.Description>
                                    <Form className="form" size="small">
                                        {errors ? (
                                            <Message negative header="Error Signing in.." content={errors} />
                                        ) : (
                                            ""
                                        )}
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
                                        <Form.Field>
                                            <div className="income">
                                                <div>
                                                    <Form.Field>
                                                        <Checkbox
                                                            checked={rememberMe}
                                                            onChange={() => setRememberMe(!rememberMe)}
                                                            size="large"
                                                            label="Remember me?"
                                                        />
                                                    </Form.Field>
                                                </div>
                                                <div onClick={() => setOpenModal(true)} className="forgot-password">
                                                    Forgot your Password?
                                                </div>
                                            </div>
                                        </Form.Field>
                                        <Form.Field>
                                            <div className="incomes">
                                                <div>
                                                    <Button
                                                        onClick={login}
                                                        id="btn"
                                                        disabled={form && form.login && form.login.syncErrors}
                                                    >
                                                        {loading ? "Loading..." : "Login"}
                                                    </Button>
                                                </div>
                                                {/* <div>
                                                    <Link to="/register">
                                                        <Button id="btn-outline" basic color="green">
                                                            Sign up
                                                        </Button>
                                                    </Link>
                                                </div> */}
                                            </div>
                                        </Form.Field>
                                    </Form>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </div>
                </Container>
            </div>
            <Modal size="mini" open={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Forgot Password?</Modal.Header>
                <Modal.Content>
                    {errorsPassword && (
                        <div>
                            <Message negative header="Error trying to update password.." content={errorsPassword} />
                        </div>
                    )}
                    {successPassword && (
                        <div>
                            <Message positive header="Successful Action!" content={successPassword} />
                        </div>
                    )}
                    <br />
                    <div className="modal-content">
                        <div></div>
                        <br />
                        <Form.Field
                            control={Input}
                            placeholder="Enter Email Adress"
                            type="email"
                            width="16"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        ></Form.Field>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                    <Button disabled={email === ""} onClick={confirmEmail} positive>
                        {loadingPasswordUpdate ? "Loading..." : "Submit"}
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default reduxForm({
    form: "login",
    destroyOnUnmount: false,
    validate: validateLogin
})(Login);
