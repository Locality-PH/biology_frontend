import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Checkbox, message, Col, Row , Card, Button, Divider} from "antd";
import ModulePages from "./Modules-pages";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { LoginLink, TextInput } from "../auth-view/LoginElement";
import TextUnderScore from "components/shared-components/TextUnderScore";
import { useLocation, Route, Switch } from "react-router-dom";
import axios from "axios";

const Modules = ({match}) => {
  const classCode = match.params.class_code

  const [modules, setModules] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [moduleId, setModuleId] = useState();


    useEffect(() => {
      message.loading("Loading modules...", 0)
        axios.get("http://localhost:5000/student/get-classroom-modules/" + classCode).then((response) => {
            setModules(response.data)
            setError(null);
            message.destroy()
          }).catch(() => {
            setIsLoading(false);
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);
  
  const HandleModules = (e) => {
    setIsLoading(false);
    console.log(e.key);
    setModuleId(e.key);
  };

  const goToQuiz = (quizLink) => {
    window.open(quizLink , "_blank")
  }

  const ModuleContent = () => {
    const module = modules.filter((module) => module.teacher_id == moduleId)
    var fileName = ""
    var quizLink = ""

    if(module.length != 0){
      fileName = module[0].module_file.filename
      quizLink = module[0].quiz_link
    }
    
    return (
      <div hidden={isLoading}>
        <ModulePages moduleId={moduleId} fileName={fileName}></ModulePages>
        <Divider></Divider>
        <Card title="Quiz" extra={
          <Button type="primary" onClick={() => goToQuiz(quizLink)} style={{backgroundColor: "green", borderColor: "green"}}>Go to quiz</Button>
        }>
          <p>{quizLink}</p>
        </Card>
      </div>
    )
  }

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
          {modules.map((result, i) => 
            <Menu.Item key={result.teacher_id}>
              <Checkbox></Checkbox>
              <span className="checkbox-span">{result.module_name}</span>
            </Menu.Item>
          )}
          
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
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Col>
            {/* {" "}
            <TextUnderScore placeholder="Username" />
            <TextUnderScore placeholder="email" /> */}
            <ModuleContent></ModuleContent>
          </Col>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Modules;
