import React from "react";
import { Route, Redirect } from "react-router-dom";

// <PrivateRoute exact path={"/resorts/add"} isLoggedIn={isLoggedIn} component={AddResort} />
function PrivateRoute({ component: Comp, isLoggedIn, user, onLogout, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Comp user={user} onLogout={onLogout} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
