import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import { getDSToken } from "../redux/";
import { Container, Loader } from "semantic-ui-react";

import "../utils/Utils";

const Callback = ({ location }) => {
    const { code } = queryString.parse(location.search);
    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        if (code) {
            dispatch(getDSToken(code, history));
        }
    }, [code, dispatch, history]);

    return (
        <div>
            <Container textAlign="center">
                <div>
                    <div className="login">
                        <div>
                            <Loader className="loader-applications" active inline="centered" size="large" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Callback;
