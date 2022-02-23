import React from "react";
import { Layout } from "antd";
import ClientNavbar from "components/Navbars/Navbar";
import { useLocation, Route, Switch } from "react-router-dom";
import HomeDashboard from "views/client-view/HomeDashboard";
import LeaveClassroom from "views/client-view/LeaveClassroom";
import Modules from "views/client-view/Modules";
import Student from "views/client-view/Student";
import StudentViewClasswork from "views/client-view/StudentViewClasswork";

import Particles from "react-tsparticles";
import particlesConfig from "./ParticlesConfig";
import StudentProfile from "views/client-view/StudentProfile";

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
          <Route path="/client/home">
            <HomeDashboard />
          </Route>
          <Route
            path="/client/classroom/:class_code/modules"
            component={Modules}
          />
          <Route
            path="/client/classroom/:class_code/leave"
            component={LeaveClassroom}
          />
          <Route
            path="/client/classroom/:class_code/students"
            component={Student}
          />
          <Route
            path="/client/:class_code/:mal_id/:classwork_type/:classwork_code"
            component={StudentViewClasswork}
          />
          <Route path="/client/user" component={StudentProfile} />
        </Switch>
      </Layout>
    </>
  );
}

export default Admin;
