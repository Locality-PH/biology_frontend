import React from "react";

import { useAuth } from "contexts/AuthContext";
import Login from "./views/auth-view/Login";
import Signup from "./views/auth-view/Signup";
import ClientLayout from "layouts/Client.js";

// import TestLogin from "./views/auth-view/TestLogin";
// import TestRegister from "./views/auth-view/TestRegister";

import PrivateRouteAdmin from "components/Private/PrivateRouteAdmin";
import AdminLayout from "layouts/Admin.js";
import { Route, Switch, Redirect } from "react-router-dom";
import ClientLogin from "views/auth-view/client/Login";
import ClientRegister from "views/auth-view/client/Register";

//Global Page Component
import ViewQuiz from "views/app-view/Quiz/ViewQuiz.js";

function App() {
  const { localData, localrole } = useAuth(); // determine if authorized, from context or however you're doing it

  React.useEffect(() => {
    localData(localStorage.getItem("mid"), localStorage.getItem("role"));
  });
  console.log(localrole);
  return (
    <div>
      <Switch>
        {/* ADMINSIDE START */}{" "}
        <Route exact path="/">
          <Redirect to="/client/login" />
        </Route>
        <Route path="/admin/login">
          <Login />{" "}
        </Route>

        <Route path="/admin/signup">
          <Signup />{" "}
        </Route>

        <PrivateRouteAdmin path="/admin">
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        </PrivateRouteAdmin>

        {/* ADMINSIDE END */}

        {/* CLIENTSIDE START */}
        <Route path="/client/login">
          <ClientLogin />{" "}
        </Route>

        <Route path="/client/register">
          <ClientRegister />{" "}
        </Route>

        {/* <Redirect from="/" to="/client/login" /> */}
        <ClientLayout />

        {/* CLIENTSIDE END*/}

        {/* GLOBAL PAGE START */}
        {/* <Route exact path="/quiz/view/:Qid">
          <ViewQuiz />
        </Route> */}

        {/* GLOBAL PAGE START */}
      </Switch>
    </div>
  );
}
export default App;


