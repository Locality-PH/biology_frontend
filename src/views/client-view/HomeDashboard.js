import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Carousel } from "antd";
import { Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import Images from "../../assets/img/carousel3.jpg";
import Card from "components/shared-components/Card";
import { useParams } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const HomeDashboard = () => {
  // const [history, setHistory] = useState();

  return (
    <>
      <Layout className="scrollable-container layout layout-background shadow-box ">
        <Content style={{ padding: "0 50px", overflow: "auto" }}>
          <div className="background-images site-layout-content-home shadow-box ">
            <Row justify="center">
              <Col
                justify="center"
                className=""
                xs={24}
                sm={22}
                md={20}
                lg={18}
                xl={18}
              >
                {" "}
                <Carousel className="rounded" autoplay>
                  <div>
                    <h3 className="carousel-1"></h3>
                  </div>
                  <div>
                    <h3 className="carousel-2"></h3>
                  </div>
                  <div>
                    <h3 className="carousel-3"></h3>
                  </div>
                  <div>
                    <h3 className="carousel-4"></h3>
                  </div>
                </Carousel>{" "}
                {/* <Card
                  style={{ width: 300 }}
                  className="shadow-box "
                  cover={<img alt="example" src={Images} />}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    style={{ height: "30px" }}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>{" "} */}{" "}
                <Row justify="center" gutter={40}>
                  {" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      color="green"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>{" "}
                  <Col
                    justify="center"
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <Card
                      image={Images}
                      name="Rojhon Buenaventura"
                      section="3 CPE-A"
                      currentPhoto="https://joeschmoe.io/api/v1/random"
                      modules={"/classroom/mongodb_id_classroom/modules"}
                      students={"/classroom/mongodb_id_classroom/students"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
      </Layout>
    </>
  );
};

export default HomeDashboard;
