import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Row, Col, Carousel, message } from "antd";

import Card from "components/shared-components/Card";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const About = () => {
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
            className="background-images site-layout-content-home shadow-box "
            style={{ height: "1000px " }}
          >
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
                  provide you only interesting content, which you will like very
                  much. We're dedicated to providing you the best of{" "}
                  <span id="W_Type2">Education</span>, with a focus on
                  dependability and{" "}
                  <span id="W_Spec">tutorial, learning, e-book, modular</span>.
                  We're working to turn our passion for{" "}
                  <span id="W_Type3">Education</span> into a booming{" "}
                  <a
                    href="https://www.blogearns.com"
                    rel="do-follow"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    online website
                  </a>
                  . We hope you enjoy our <span id="W_Type4">Education</span> as
                  much as we enjoy offering them to you.
                </p>
                <p>
                  I will keep posting more important posts on my Website for all
                  of you. Please give your support and love.
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

export default About;
