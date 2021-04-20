import React, { useState } from "react";
import { Container, Button, Form, Card, Input, Icon, Message } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";

import { useDispatch } from "react-redux";

import { createNewPassword } from "../../redux";

import "../../styles/auth.scss";

const UpdatePassword = ({ location }) => {
    const [errors, setErrors] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordTwo, setShowPasswordTwo] = useState(false);

    const history = useHistory();

    const { token } = queryString.parse(location.search);

    const userData = {
        password,
        token
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrors("Password must match");
            setLoadingPasswordUpdate(false);
        } else {
            setErrors(false);
            dispatch(createNewPassword(userData, setLoading, history));
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
                        <div className="logo-wrapper">
                            <img src="/assets/logo-auth.png" alt="Logo" />
                        </div>
                        <Card fluid color="lightblue" className="card">
                            <Card.Content>
                                <Card.Description>
                                    <Form className="form" onSubmit={handleSubmit} size="small">
                                        {errors ? (
                                            <Message negative header="Error Updating Password.." content={errors} />
                                        ) : (
                                            ""
                                        )}
                                        <Form.Field>
                                            <label>New Password</label>
                                            <Input
                                                icon={
                                                    showPassword ? (
                                                        <Icon
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            name="eye"
                                                            link
                                                        />
                                                    ) : (
                                                        <Icon
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            name="eye slash"
                                                            link
                                                        />
                                                    )
                                                }
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                size="big"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                required
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Confirm Password</label>
                                            <Input
                                                icon={
                                                    showPassword ? (
                                                        <Icon
                                                            onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                                                            name="eye"
                                                            link
                                                        />
                                                    ) : (
                                                        <Icon
                                                            onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                                                            name="eye slash"
                                                            link
                                                        />
                                                    )
                                                }
                                                placeholder="Confirm Password"
                                                size="big"
                                                type={showPasswordTwo ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <div>
                                                <Button id="btn" disabled={loading}>
                                                    {loadingPasswordUpdate ? "Loading..." : "Update"}
                                                </Button>
                                            </div>
                                        </Form.Field>
                                        <Form.Field>
                                            <div className="incomes">
                                                <div>
                                                    <Link to="/login">
                                                        <span id="link">Login</span>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to="/register">
                                                        <span id="link">Register</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Form.Field>
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

export default UpdatePassword;
