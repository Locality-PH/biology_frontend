import React from "react";
import { Layout } from "antd";
import ClientNavbar from "components/Navbars/Navbar";
import { useLocation, Route, Switch } from "react-router-dom";
import HomeDashboard from "views/client-view/HomeDashboard";
import Modules from "views/client-view/Modules";
import Student from "views/client-view/Student";

import Particles from "react-tsparticles";
import particlesConfig from "./ParticlesConfig";

function Admin() {
  return (
    <>
      <Layout>
        <ClientNavbar />{" "}
        <div>
          <Particles
            id="tsparticles"
            canvasClassName="display-canvas"
            options={particlesConfig}
            width="25vw"
            height="25vh"
          />{" "}
        </div>
        <Switch>
          <Route path="/home">
            <HomeDashboard />
          </Route>
          <Route path="/classroom/:class_code/modules" component={Modules} />{" "}
          <Route path="/classroom/:class_code/leave" />{" "}
          <Route path="/classroom/:class_code/students" component={Student} />
        </Switch>
      </Layout>
    </>
  );
}

export default Admin;
