import React from "react";
import { Route, Redirect } from "react-router-dom";

//Configure protected route checking state for current logged in admin
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!localStorage.getItem("TaxToken") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;