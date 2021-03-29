/**@format */

import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? (
          <Component {...props} user={auth.getCurrentUser()} />
        ) : (
          render(props)
        );
      }}
    ></Route>
  );
};

export default ProtectedRoute;
