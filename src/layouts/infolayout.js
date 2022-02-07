import React from "react";
import { Layout } from "antd";
import ClientNavbar from "components/Navbars/Navbar";
import { useLocation, Route, Switch } from "react-router-dom";
import About from "views/info-view/about";
import Term from "views/info-view/privacy";

import LeaveClassroom from "views/client-view/LeaveClassroom";

import Particles from "react-tsparticles";
import particlesConfig from "./ParticlesConfig";

function Admin() {
  return (
    <>
      <Layout>
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
          <Route path="/about-us/" component={About} />
          <Route path="/term/" component={Term} />
        </Switch>
      </Layout>
    </>
  );
}

export default Admin;
