import React from "react";
import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavProfile from "components/Navbars/NavProfile";

const ClientNavbar = () => {
  return (
    <Navbar expand="lg" bg="white" variant="white" >
      <Nav className="container-fluid">
        <Navbar.Brand
          className="ml-2"
          style={{ marginLeft: "20px" }}
          href="#home"
        >
          Biology App
        </Navbar.Brand>
        <Navbar className="border-b justify-content-center">
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
        </Navbar>
        <Nav.Item className="ml-auto">
          <Nav.Link>
            <NavProfile />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default ClientNavbar;
