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
                  <h2>About Us !</h2>
                  <h3 style={{ textAlign: "center" }}>
                    Welcome To <span id="W_Name1">GenBioSCope</span>
                  </h3>
                  <p>
                    <span id="W_Name2">GenBioSCope</span> is a Professional{" "}
                    <span id="W_Type1">Education</span> Platform. Here we will
                    provide you only interesting content, which you will like
                    very much. We're dedicated to providing you the best of{" "}
                    <span id="W_Type2">Education</span>, with a focus on
                    dependability and{" "}
                    <span id="W_Spec">tutorial, learning, e-book, modular</span>
                    . We're working to turn our passion for{" "}
                    <span id="W_Type3">Education</span> into a booming{" "}
                    <a
                      href="https://www.blogearns.com"
                      rel="do-follow"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      online website
                    </a>
                    . We hope you enjoy our <span id="W_Type4">Education</span>{" "}
                    as much as we enjoy offering them to you.
                  </p>
                  <p>
                    I will keep posting more important posts on my Website for
                    all of you. Please give your support and love.
                  </p>

                  <p style={{ fontWeight: "bold", textAlign: "center" }}>
                    Thanks For Visiting Our Site
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
                      Have a nice day !
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
