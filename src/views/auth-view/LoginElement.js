import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";

export const Nav = styled.nav`
  background: #000000;
  height: 80px;
  /* margin-top: -80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const LoginLink = styled(LinkRouter)`
  text-decoration: none;
  color: #999;
  transition: 0.3s;
  a {
    display: block;
    text-align: right;
    text-decoration: none;
    color: #999;
    font-size: 0.9rem;
    width: 50%;
    float: right;
    transition: 0.3s;
    a:hover {
      color: #38d39f;
    }
    &:hover {
      a {
        color: #38d39f;
      }
    }
  }
`;
export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;
export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

//
export const WaveImage = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
  @media screen and (max-width: 1000px) {
    img {
      width: 400px;
    }
  }
`;

export const ImageTwo = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export const ImageSub = styled.img`
  width: 500px;
`;

export const LoginContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  img {
    height: 100px;
  }
  h2 {
    margin: 15px 0;
    color: #333;
    text-transform: uppercase;
    font-size: 2.9rem;
  }
  @media screen and (max-width: 1000px) {
    h2 {
      font-size: 2.4rem;
      margin: 8px 0;
    }
  }
`;

export const FormGlobal = styled(Form)`
  width: 360px;

  @media screen and (max-width: 1000px) {
    width: 290px;
  }
`;
