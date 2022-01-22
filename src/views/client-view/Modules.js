import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Checkbox,
  message,
  Col,
  Row,
  Card,
  Button,
  Divider,
} from "antd";
import ModulePages from "./Modules-pages";
const { Header, Content, Footer, Sider } = Layout;

import axios from "axios";

const Modules = ({ match }) => {
  const classCode = match.params.class_code;
  const studentId = localStorage.getItem("sid");

  const [modules, setModules] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [moduleId, setModuleId] = useState();


  const getClassroomModules = () =>{
    message.loading("Loading modules...", 0);
    axios
    .get("/api/student/get-classroom-modules/" + classCode + "/" + studentId)
    .then((response) => {
      setModules(response.data);
      setError(null);
      message.destroy();
    })
    .catch(() => {
      setIsLoading(false);
      message.error("Could not fetch the data in the server!");
    });

  }

  useEffect(() => {
    getClassroomModules()
   
  }, []);

  const HandleModules = (e) => {
    setIsLoading(false);
    console.log(e.key);
    setModuleId(e.key);
  };

  const checkboxOnChange = (e, moduleId, moduleName) => {
    if(e.target.checked == true){
      console.log("Finish Checkbox Module id", moduleId)

      // if(modules.length > index + 1){
      //   modules[index].finish = true
      //   modules[index + 1].disabled = false
      // }else{
      //   modules[index].finish = true
      // }

      message.loading("Finishing " + moduleName + "...", 0)
      
      axios
      .post("/api/student/module-finish", {"class_code": classCode, "module_id": moduleId, "student_id": studentId})
      .then((response) => {
        if (response.data == "Error") {
          message.destroy();
          message.error("Error");
        } else {
          message.destroy();
          message.success(response.data);
          getClassroomModules()
        }
      })
      .catch(() => {
        message.destroy();
        message.error("Error!");
      });
    }else if(e.target.checked == false){
      console.log("Unfinish Checkbox Module id", moduleId)

      message.loading("Unfinishing " + moduleName + "...", 0)

      axios
      .post("/api/student/module-unfinish", {"class_code": classCode, "module_id": moduleId, "student_id": studentId})
      .then((response) => {
        if (response.data == "Error") {
          message.destroy();
          message.error("Error");
        } else {
          message.destroy();
          message.success(response.data);
          getClassroomModules()
        }
      })
      .catch(() => {
        message.destroy();
        message.error("Error!");
      });
    }
  }

  const goToQuiz = (quizLink) => {
    window.open(quizLink, "_blank");
  };

  const ModuleContent = () => {
    const module = modules.filter((module) => module._id == moduleId);
    var fileName = "";
    var quizLink = "";

    if (module.length != 0) {
      fileName = module[0].module_file.filename;
      quizLink = module[0].quiz_link;
    }

    return (
      <div hidden={isLoading}>
        <ModulePages moduleId={moduleId} fileName={fileName}></ModulePages>
        <Divider></Divider>
        <Card
          title="Quiz"
          extra={
            <Button
              type="primary"
              onClick={() => goToQuiz(quizLink)}
              style={{ backgroundColor: "green", borderColor: "green" }}
            >
              Go to quiz
            </Button>
          }
        >
          <p>{quizLink}</p>
        </Card>
      </div>
    );
  };

  return (
    <Layout>
      <Sider
        width={200}
        className="site-layout-background"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={HandleModules}
        >
          {modules.map((result, i) => (
            <Menu.Item key={result._id} disabled={result.disabled} style={{backgroundColor: (result.disabled == true)?"#bebebe": ""}}>
              <Checkbox onChange={e => checkboxOnChange(e, result._id, result.module_name)} defaultChecked={result.finish} disabled={result.disabled}></Checkbox>
              <span className="checkbox-span" style={{cursor: (result.disabled == true)?"not-allowed": "pointer"}}>{result.module_name}</span>
            </Menu.Item>
          ))}
        </Menu>{" "}
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>currentclassroom</Breadcrumb.Item>
          <Breadcrumb.Item>Modules</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Col lg={24}>
            {" "}
            {/* <TextUnderScore placeholder="Username" /> */}
            {/* <TextUnderScore placeholder="email" /> */}
            <div className="content-data">
              {" "}
              <ModuleContent></ModuleContent>
            </div>{" "}
          </Col>
          <Col>
            {/* {" "}
            <TextUnderScore placeholder="Username" />
            <TextUnderScore placeholder="email" /> */}
          </Col>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Modules;
