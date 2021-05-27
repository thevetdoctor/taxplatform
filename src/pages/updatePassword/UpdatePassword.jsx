import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  Card,
  Input,
  Icon,
  Message,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { createNewPassword, resetPasswordRequest } from "../../redux";
import "../../styles/auth.scss";

const UpdatePassword = ({ location }) => {
  const [errors, setErrors] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPasswordUpdate, setLoadingPasswordUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const { token } = queryString.parse(location.search);

  const userData = {
    password,
    token,
  };

  const dispatch = useDispatch();

  const passwordReset = () => {
    dispatch(resetPasswordRequest({email}, setLoading, setErrors, history));
  };

  const resetPassword = () => {
    console.log("resetPassword");
    if (password !== confirmPassword) {
      setErrors("Password must match");
      setLoadingPasswordUpdate(false);
    } else {
      console.log("createNewPassword");
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
                  <Form className="form" size="small">
                    {errors && (
                      <Message
                        negative
                        header="Error Updating Password.."
                        content={errors}
                      />
                    )}
                    {token ? (
                      <>
                        <Form.Field>
                          <label>New Password</label>
                          <Input
                            icon={
                              <Icon
                                onClick={() => setShowPassword(!showPassword)}
                                name={showPassword ? "eye" : "eye slash"}
                                link
                              />
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
                              <Icon
                                onClick={() => setShowPassword(!showPassword)}
                                name={showPassword ? "eye" : "eye slash"}
                                link
                              />
                            }
                            placeholder="Confirm Password"
                            size="big"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </Form.Field>
                        <Form.Field>
                          <div>
                            <Button
                              id="btn"
                              disabled={loading}
                              style={{ margin: "auto", display: "block" }}
                              onClick={() => {
                                resetPassword();
                              }}
                            >
                              {loadingPasswordUpdate ? "Loading..." : "Update"}
                            </Button>
                          </div>
                        </Form.Field>
                      </>
                    ) : (
                      <>
                        <Form.Field>
                          <Input
                            type="email"
                            placeholder="Enter Email Used to Register"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            required
                          />
                        </Form.Field>
                        <Button
                          id="btn"
                          disabled={loading}
                          style={{
                            margin: "auto",
                            display: "block",
                            width: "300px",
                            marginBottom: "15px",
                          }}
                          onClick={() => {
                            passwordReset();
                          }}
                        >
                          Request Password Reset
                        </Button>
                      </>
                    )}
                    <Form.Field>
                      <div className="incomes">
                        <div>
                          <Link to="/">
                            <span id="link">Back</span>
                          </Link>
                        </div>
                        <div>
                          <Link to="/register">
                            <span id="link">Create Admin</span>
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
