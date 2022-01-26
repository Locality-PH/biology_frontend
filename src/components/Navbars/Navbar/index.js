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
  const currentClassroomCode = currentUrl.split("/")[3]
  
  console.log(currentUrl);
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLogo to="/client/home">
            <h1 style={{ color: "white", marginTop: "8px" }}>Biology</h1>
          </NavLogo>
          {/* <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon> */}
          {currentUrl.match("/client/classroom") ? (
            <NavMenu>
              {" "}
              <NavItem>
                <NavLinks to={`/client/classroom/${currentClassroomCode}/modules`}>Modules</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to={`/client/classroom/${currentClassroomCode}/students`}>Student</NavLinks>
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
