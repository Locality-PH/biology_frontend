import React from "react";
import { FaBars } from "react-icons/fa";

import {
  Nav,
  NavLogo,
  NavbarContainer,
  NavMenu,
  MobileIcon,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElement";
import NavProfile from "components/Navbars/NavProfile";
import { useParams } from "react-router-dom";
const NavBar = ({ toggle }) => {
  const url = useParams();
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/">
            <h1 style={{ color: "white", marginTop: "8px" }}>Biology</h1>
          </NavLogo>
          {/* <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon> */}
          {currentUrl.match("/classroom") ? (
            <NavMenu>
              {" "}
              <NavItem>
                <NavLinks to="about">Modules</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="discover">Student</NavLinks>
              </NavItem>
            </NavMenu>
          ) : null}
          <NavBtn>
            <NavBtnLink />{" "}
          </NavBtn>{" "}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default NavBar;
