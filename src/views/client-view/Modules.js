import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Checkbox, message } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { LoginLink, TextInput } from "../auth-view/LoginElement";
import { Col, Row } from "antd";
import TextUnderScore from "components/shared-components/TextUnderScore";
import { useLocation, Route, Switch } from "react-router-dom";

const Classroom = () => {
  const [sampleNav, setSampleNav] = useState();
  const HandleModules = (e) => {
    message.info("Click on menu item.");
    console.log(e.key);
    setSampleNav(e.key);
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
          <Menu.Item key="mongodb id here and populate">
            <Checkbox></Checkbox>
            <span className="checkbox-span">Module 1</span>
          </Menu.Item>{" "}
          <Menu.Item key="2">
            <Checkbox></Checkbox>
            <span className="checkbox-span">Module 2</span>
          </Menu.Item>{" "}
          <Menu.Item key="3">
            <Checkbox></Checkbox>
            <span className="checkbox-span">Module 3</span>
          </Menu.Item>{" "}
          <Menu.Item key="4">
            <Checkbox></Checkbox>
            <span className="checkbox-span">Module 4</span>
          </Menu.Item>{" "}
          <Menu.Item key="5">
            <Checkbox></Checkbox>
            <span className="checkbox-span">Module 5</span>
          </Menu.Item>{" "}
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
          <Col lg={10}>
            {" "}
            <TextUnderScore placeholder="Username" />
            <TextUnderScore placeholder="email" />
            <h1> {sampleNav}</h1>
          </Col>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Classroom;
