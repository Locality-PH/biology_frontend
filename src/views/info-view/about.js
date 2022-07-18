import React from "react";
import { Layout, Row, Col, Card, Avatar } from "antd";
import Research1 from "assets/img/researcher/research1.jpeg";
import Research2 from "assets/img/researcher/research2.jpg";
import Research3 from "assets/img/researcher/research3.png";
import Research4 from "assets/img/researcher/research4.jpg";

const { Header, Content } = Layout;
const { Meta } = Card;

const About = () => {
  const profile = [
    { img: Research1, name: "Kent John Delos Santos", type: "Researcher" },
    { img: Research2, name: "Aron John Manalo", type: "Researcher" },
    { img: Research3, name: "Abegail Gacosta", type: "Researcher" },
    { img: Research4, name: "Mia Rose Pantaleon", type: "Researcher" },
  ];
  return (
    <>
      <Layout className="scrollable-container layout layout-background shadow-box ">
        <Content
          style={{
            padding: "0 10px",
            overflow: "auto",
            height: "1000px !important",
          }}
        >
          <div
            className="background-images site-layout-content-home-2 shadow-box "
            style={{ height: "1000px " }}
          >
            <div className="site-layout-content-home">
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
                  <h2>About Us</h2>
                  <h3 style={{ textAlign: "center" }}>
                    Welcome To <span id="W_Name1">GenBioScope</span>
                  </h3>
                  <p>
                    <span id="W_Name2">
                      GenBioScope is a web-based modular application
                      thoughtfully designed for students and teachers. It is a
                      study space to connect with classes, read and download
                      modules, and do activities and quizzes completely for
                      Biology subject.
                    </span>
                  </p>
                  <p>
                    Further, GenBioScope comprises of designed Instructional
                    Materials (IM's) that will aid in improving the learning
                    process by addressing the incomprehensible and the least
                    mastered competencies in Biology. This will help the
                    students to comprehend the topic/s and improve their
                    knowledge by using the Instructional Materials, Activities,
                    and Quizzes included in this web-based modular application.
                  </p>

                  <p style={{ fontWeight: "bold", textAlign: "center" }}>
                    Thanks For Visiting Our Site.
                    <br />
                    <br />
                    <span
                      style={{
                        color: "blue",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Meet the Team.
                    </span>
                  </p>
                  <Row justify="center">
                    {profile.map((item) => {
                      return (
                        <Col justify="center">
                          <aside class="profile-card">
                            <header>
                              <a href="#">
                                <img src={item.img} />
                              </a>

                              <h1>{item.name}</h1>

                              <h2>{item.type}</h2>
                            </header>
                          </aside>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer> */}
      </Layout>
    </>
  );
};

export default About;
