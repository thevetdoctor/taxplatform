import React, { Suspense, useEffect, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";

//import preloader
import Preloader from "./components/Preloader";
import ProtectedRoute from "./ProtectedRoute";
import JwtDecode from "jwt-decode";
import axios from "axios";
import store from "./redux/store";
import {
  setIsLogin,
  logoutAdmin,
  setApplicationError,
  setApplicationSuccess,
} from "./redux";

//import components
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const UpdatePassword = lazy(() =>
  import("./pages/updatePassword/UpdatePassword")
);
const Application = lazy(() => import("./pages/application/Application.jsx"));
const Credit = lazy(() => import("./pages/credit/CreditAppPage"));
const Billing = lazy(() => import("./pages/billing/Billing"));
const BillingForm = lazy(() => import("./pages/billing/BillingForm.jsx"));
const Errors = lazy(() => import("./pages/errors/Errors.jsx"))
const Callback = lazy(() => import("./components/Callback"));

const App = () => {
  const state = useSelector((state) => state.app);

  const token = localStorage.TaxToken;
  if (token) {
    const decoded = JwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      store.dispatch(logoutAdmin());
      window.location.href = "/login";
    } else {
      store.dispatch(setIsLogin(true));
      axios.defaults.headers.common["x-access-token"] = token;
    }
  }

  useEffect(() => {
    if (state.error && state.error.length > 0) {
      setTimeout(() => {
        store.dispatch(setApplicationError(""));
      }, 5000);
    } else if (state.success && state.success.length > 0) {
      setTimeout(() => {
        store.dispatch(setApplicationSuccess(""));
      }, 5000);
    }
  }, [state.error, state.success]);

  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Preloader />}>
          <Switch>
            <ProtectedRoute exact path="/" component={Application} />
            {/* <Route exact path="/register" component={Register} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/update/password" component={UpdatePassword} />
            <Route exact path="/dsCallback" component={Callback} />
            <Route
              exact
              path="/form/initial-billing/:applicationId"
              component={BillingForm}
            />
            <ProtectedRoute exact path="/credit" component={Credit} />
            <ProtectedRoute
              exact
              path="/applications"
              component={Application}
            />
            <ProtectedRoute exact path="/billing" component={Billing} />
            <ProtectedRoute exact path="/errors" component={Errors} />
          </Switch>
        </Suspense>
      </Router>
      {state.error && state.error.length > 0 && (
        <div id="message">
          <div>
            <Message
              id="errorMessage"
              icon="cancel"
              header="There was an error"
              content={state.error}
              wide
            />
          </div>
        </div>
      )}
      {state.success && state.success.length > 0 && (
        <div id="message">
          <Message
            id="successMessage"
            icon="check"
            header="There was a successful action"
            content={state.success}
            wide
          />
        </div>
      )}
    </div>
  );
};

export default App;
