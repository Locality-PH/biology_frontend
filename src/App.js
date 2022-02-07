import React, { Suspense } from "react";
import { useAuth } from "contexts/AuthContext";
import Login from "./views/auth-view/Login";
import Signup from "./views/auth-view/Signup";
import ClientLayout from "layouts/Client.js";
// import TestLogin from "./views/auth-view/TestLogin";
// import TestRegister from "./views/auth-view/TestRegister";
import PrivateRouteAdmin from "components/Private/PrivateRouteAdmin";
import PrivateRouteClient from "components/Private/PrivateRouteClient";
import About from "views/info-view/about";
import Term from "views/info-view/privacy";
import AdminLayout from "layouts/Admin.js";
import InfoLayout from "layouts/infolayout.js";
import Loading from "components/shared-components/Loading";
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
  console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

  return (
    <>
      {" "}
      <Suspense fallback={<Loading cover="page" />}>
        <Switch>
          {" "}
          {/* ADMINSIDE START */}{" "}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>{" "}
          <Route path="/admin/login" component={Login} />
          <Route path="/admin/signup" component={Signup} />
          <PrivateRouteAdmin path="/admin">
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
          </PrivateRouteAdmin>{" "}
          {/* ADMINSIDE */}
          {/* CLIENTSIDE */}
          <Route path="/client/login" component={ClientLogin} />{" "}
          <Route path="/client/register" component={ClientRegister} />
          <Route path="/about-us/" component={About} />
          <Route path="/term/" component={Term} />
          <PrivateRouteClient path="/">
            <ClientLayout />
          </PrivateRouteClient>{" "}
          {/* <Redirect from="/" to="/client/login" /> */}
          {/* CLIENTSIDE */}
        </Switch>{" "}
      </Suspense>
    </>
  );
}
export default App;
