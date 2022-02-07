import React from "react";
import { Layout } from "antd";
import ClientNavbar from "components/Navbars/Navbar";
import { useLocation, Route, Switch } from "react-router-dom";
import HomeDashboard from "views/client-view/HomeDashboard";
import LeaveClassroom from "views/client-view/LeaveClassroom";
import Modules from "views/client-view/Modules";
import Student from "views/client-view/Student";
import StudentViewQuiz from "views/client-view/StudentViewQuiz";

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
          <Route path="/client/home" component={HomeDashboard} />

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
            path="/client/:class_code/:module_id/quiz/:quiz_code"
            component={StudentViewQuiz}
          />
          <Route path="/client/user" component={StudentProfile} />
        </Switch>
      </Layout>
    </>
  );
}

export default Admin;
