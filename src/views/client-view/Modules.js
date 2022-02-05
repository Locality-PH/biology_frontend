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
import Lesson from "./Lesson"
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


import axios from "axios";
import { FileTextOutlined} from "@ant-design/icons";

const Modules = ({ match }) => {
  const classCode = match.params.class_code;
  const studentId = localStorage.getItem("sid");

  const [modules, setModules] = useState([]);
  const [description, setDescription] = useState("")

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentItem, setCurrentItem] = useState();

  const underLineStyle = {
    textDecoration: "underline"
  }

  const getClassroomModules = () =>{
    message.loading("Loading modules...", 0);
    axios
    .get("/api/student/get-classroom-modules/" + classCode + "/" + studentId)
    .then((response) => {
      console.log(response.data)
      setModules(response.data);
      setError(null);
      message.destroy();
    })
    .catch(() => {
      setIsLoading(false);
      message.error("Could not fetch the data in the server!");
    });

  }

  const getClassroomDescription = () => {
    axios
    .get("/api/student/get-classroom-description/" + classCode)
    .then((response) => {
      setDescription(response.data)
    })
    .catch(() => {
      message.error("Could not fetch the data in the server!");
    });

  }

  useEffect(() => {
    getClassroomDescription()
    getClassroomModules()
  }, []);

  const HandleModules = (e) => {
    setIsLoading(false);
    // console.log(e.key);
    setCurrentItem(e.key);
  };

  const ModuleContent = () => {
    if(currentItem != null){
      const currentItemContent = currentItem.split("/")[0]

      if(currentItemContent == "introduction"){
        return introductionContent()
      }

      if(currentItemContent == "lesson"){
        return lessonContent()
      }

      if(currentItemContent == "quiz"){
        return quizContent()
      }
    }
   
    return (
      <Card title="Classroom Description">
        <h2>{description}</h2>
      </Card>
    )
  };

  const downloadModule = (moduleId) => {
    console.log("Downloading");
    // window.location.assign(
    //   "https://biology-server.herokuapp.com/api/student/download-module/" + moduleId,
    //   "_blank"
    // );

    window.location.assign(
      "http://localhost:5000/api/student/download-module/" + moduleId,
      "_blank"
    );
  };

  const introductionContent = () => {
    const moduleId = currentItem.split("/")[1]
    const introData = modules.filter(modules => modules.module_id == moduleId)

    return (
      <>
        <Card title={
          <Button type="primary" onClick={() => {downloadModule(moduleId)}} style={{ backgroundColor: "green", borderColor: "green" }}>
            Download {introData[0].downloadable_module.filename}
          </Button>}>
        </Card>
        <ModulePages moduleId={moduleId}></ModulePages>
      </>
    )
  }

  const lessonContent = () => {
    const moduleLessonId = currentItem.split("/")[1]
    const lessonClassworkCode = currentItem.split("/")[2]

    const [hidden, setHidden] = useState(false)

    const ViewLesson = () => {
      return(
        <>
          {(hidden == true)?<Lesson moduleLessonId={moduleLessonId}></Lesson>:""}
        </>
      )
    }

    return (
      <>
        <Card hidden={hidden} title={<Button type="primary" onClick={() => {setHidden(true)}} style={{ backgroundColor: "green", borderColor: "green" }}>View Lesson</Button>}>
        </Card>
        <div hidden={!hidden}>
          <ViewLesson></ViewLesson>
        </div>
        <Card title="Activity Classwork">
          <h4 style={underLineStyle}>
            <a href={`/client/${classCode}/${moduleLessonId}/activity/${lessonClassworkCode}`} target="_blank">
              client/{classCode}/{moduleLessonId}/activity/{lessonClassworkCode}
            </a>
          </h4>
        </Card>
      </>
    )
  }

  const quizContent = () => {
    const moduleId = currentItem.split("/")[1]
    const moduleClassworkCode = currentItem.split("/")[2]

    return (
      <>
        <Card title="Quiz">
          <h4 style={underLineStyle}>
            <a href={`/client/${classCode}/${moduleId}/quiz/${moduleClassworkCode}`} target="_blank">
              client/{classCode}/{moduleId}/quiz/{moduleClassworkCode}
            </a>
          </h4>
        </Card>
      </>
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
        {/* <Menu
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
        </Menu> */}

        <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub0"]}
        style={{ height: "100%", borderRight: 0 }}
        onClick={HandleModules}
      >
        {modules.map((modulesData, modulesIndex) => (
          <SubMenu key={"sub" + modulesIndex} icon={<FileTextOutlined />} title={modulesData.name}>
            <Menu.Item key={`introduction/${modulesData.module_id}`}>{modulesData.topic_name}</Menu.Item>
            <SubMenu key={"l" + modulesIndex} title="Lessons">
              {modulesData.lessons.map(lessonData => (
                  <Menu.Item key={`lesson/${lessonData.module_lesson_id}/${lessonData.classwork_code}`}>
                    {lessonData.lesson_name}
                  </Menu.Item>
              ))}
            </SubMenu>
            <Menu.Item key={`quiz/${modulesData.module_id}/${modulesData.classwork_code}`}>Quiz</Menu.Item>
          </SubMenu>
        ))}
      </Menu>
      
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
