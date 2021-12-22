import { useAuth } from "contexts/AuthContext";
import Login from "./views/auth-view/Login";
import Signup from "./views/auth-view/Signup";
import PrivateRouteAdmin from "components/Private/PrivateRouteAdmin";
import AdminLayout from "layouts/Admin.js";
import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

function App() {
  const { localData, localrole } = useAuth(); // determine if authorized, from context or however you're doing it

  React.useEffect(() => {
    localData(localStorage.getItem("mid"), localStorage.getItem("role"));
  });
  console.log(localrole);
  return (
    <div>
      <Switch>
        {/* ADMINSIDE */}
        <Route path="/admin/login">
          <Login />{" "}
        </Route>
        <Route path="/admin/signup">
          <Signup />{" "}
        </Route>
        <PrivateRouteAdmin path="/admin">
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        </PrivateRouteAdmin>
        {/* ADMINSIDE */}
      </Switch>
    </div>
  );
}
export default App;
