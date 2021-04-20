import React from "react";
import { Container, Loader } from "semantic-ui-react";

import "../styles/auth.scss";

const Preloader = () => {
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

export default Preloader;
