import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, message } from "antd";
import { Avatar } from "antd";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
import Images from "../../assets/img/carousel3.jpg";
import Card from "components/shared-components/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const HomeDashboard = () => {
  const studentId = localStorage.getItem("sid");

  const [classrooms, setClassrooms] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getClassrooms = () => {
    message.loading("Loading classrooms...", 0);

    axios
      .get("/api/student/get-classrooms/" + studentId)
      .then((response) => {
        message.destroy();
        setClassrooms(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch(() => {
        message.destroy();
        setIsLoading(false);
        message.error("Could not fetch the data in the server!");
      });
  };

  useEffect(() => {
    getClassrooms();
  }, []);
  // const [history, setHistory] = useState();
  const { currentUser } = useAuth();

  console.log("current user:", currentUser)

  return (
    <>
      <Layout className="scrollable-container layout layout-background shadow-box ">
        <Content
          style={{ padding: "0 10px", overflow: "auto", height: "800px" }}
        >
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
                {/* <Carousel className="rounded" autoplay>
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
                </Carousel>{" "} */}
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
                <Row style={{ height: "800px" }} justify="center" gutter={40}>
                  {" "}
                  <Col
                    justify="center"
                    style={{ height: "100px" }}
                    xxs={1}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={11}
                    xl={7}
                  >
                    {" "}
                    <div>
                      {" "}
                      <div className="no_data">
                        {" "}
                        <div class="vertical-center">
                          <h3>
                            <b>Join Now</b>
                          </h3>
                          <p>
                            Navigate to the profile to join a classroom and
                            start doing modules
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row justify="center" gutter={40}>
                  {classrooms.map((result, i) => (
                    <Col
                      key={i}
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
                        name={result.teacher_name}
                        className={result.name}
                        section={result.section_name}
                        color="green"
                        currentPhoto="https://joeschmoe.io/api/v1/random"
                        modules={`/client/classroom/${result.class_code}/modules`}
                        students={`/client/classroom/${result.class_code}/students`}
                        leave={`/client/classroom/${result.class_code}/leave`}
                      />
                    </Col>
                  ))}{" "}
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
