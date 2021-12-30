import React from "react";
import { Layout } from "antd";
import ClientNavbar from "components/Navbars/ClientNavbar";
import { useLocation, Route, Switch } from "react-router-dom";
import HomeDashboard from "views/client-view/HomeDashboard";
import Classroom from "views/client-view/Classroom";

function Admin() {
  return (
    <>
      <Layout>
        <ClientNavbar />
        <Switch>
          <Route path="/home">
            <HomeDashboard />
          </Route>
          <Route path="/classroom/">
            <Classroom />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default Admin;
