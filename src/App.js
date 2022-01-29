import React from "react";

import { useAuth } from "contexts/AuthContext";
import Login from "./views/auth-view/Login";
import Signup from "./views/auth-view/Signup";
import ClientLayout from "layouts/Client.js";

// import TestLogin from "./views/auth-view/TestLogin";
// import TestRegister from "./views/auth-view/TestRegister";

import PrivateRouteAdmin from "components/Private/PrivateRouteAdmin";
import PrivateRouteClient from "components/Private/PrivateRouteClient";

import AdminLayout from "layouts/Admin.js";
import { Route, Switch, Redirect } from "react-router-dom";
import ClientLogin from "views/auth-view/client/Login";
import ClientRegister from "views/auth-view/client/Register";

//Global Page Component
import ViewQuiz from "views/app-view/Quiz/ViewQuiz.js";

function App() {
  const { localData, localrole } = useAuth(); // determine if authorized, from context or however you're doing it

  React.useEffect(() => {
    const cookiestored = new Cookies();
    console.log(`cookies ${cookiestored.get("teststorate")}`);
    const cookies = new Cookies();
    cookies.set("teststorage", "hello world", { path: "/" });
    localData(localStorage.getItem("mid"), localStorage.getItem("role"));
  });
  console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

  return (
    <div>
      <Switch>
        {/* ADMINSIDE START */}{" "}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/admin/login" component={Login} />
        <Route path="/admin/signup" component={Signup} />
        <PrivateRouteAdmin path="/admin">
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        </PrivateRouteAdmin>
        {/* ADMINSIDE */}
        {/* CLIENTSIDE */}
        <Route path="/client/login" component={ClientLogin} />{" "}
        <Route path="/client/register" component={ClientRegister} />
        <PrivateRouteClient path="/">
          <ClientLayout />
        </PrivateRouteClient>{" "}
        {/* <Redirect from="/" to="/client/login" /> */}
        {/* CLIENTSIDE */}
      </Switch>
    </div>
  );
}
export default App;
