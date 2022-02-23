import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const PrivateRouteAdmin = ({ children, ...rest }) => {
  const { currentUser, localrole } = useAuth(); // determine if authorized, from context or however you're doing it
  console.log(localrole);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser &&
        (localrole || localStorage.getItem("role")) == "Student" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouteAdmin;
