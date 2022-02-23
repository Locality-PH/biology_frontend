/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { Avatar, Menu, Dropdown } from "antd";
import utils from "utils";
import routes from "routes.js";

import "../../assets/css/admin-navbar.css";
import AvatarProfile from "components/shared-components/AvatarProfile/AvatarProfile";

function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const history = useHistory();

  useEffect(() => {
    console.log(localStorage.getItem("avatar"));
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/admin/login");
    } catch {
      setError("Failed to log out");
    }
  }
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const getBrandLink = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].layout + routes[i].path;
      }
    }
    return "#home";
  };

  const menu = (
    <Menu style={{ marginTop: "5px" }}>
      <Menu.Item key="1">
        <Link to="/admin/user">Edit Account</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleLogout()}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="ml-2 d-flex justify-content-center align-items-center ml-lg-0">
          <Button
            variant="dark"
            className="p-2 d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle"
            onClick={mobileSidebarToggle}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Link to={getBrandLink()}>
            <Navbar.Brand className="mr-2">{getBrandText()}</Navbar.Brand>
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav" navbar>
            <Nav.Item>
              <Nav.Link
                data-toggle="dropdown"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                className="m-0"
              >
                <span className="ml-1 d-lg-none">Dashboard</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link
                className="m-0"
                href="/admin/user"
              // onClick={(e) => e.preventDefault()}
              >
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
              <Nav.Link className="m-0" href="/admin/user">
                {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
                <Avatar
                  className="navbar-avatar-icon"
                  size={33}
                  src={currentUser?.photoURL}
                  style={{ backgroundColor: "green", fontSize: 16 }}
                >
                  {utils.getNameInitial(localStorage.getItem("fullname"))}
                </Avatar>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{ margin: "auto auto auto -10px" }}>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <img
                    className="navbar-gear-icon"
                    src="/img/others/gear.png"
                    style={{ height: "32px", width: "32px" }}
                  />
                </Dropdown>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
