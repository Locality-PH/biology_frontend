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

const BorderlessText = ({ className }) => {
  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  return (
    <div className={className}>
      <div className="container-group">
        {" "}
        <div className="form-list one">
          <div className="div">
            <input type="text" placeholder="Email" className="input" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TextInput = styled(BorderlessText)`
  .container-group .form-list {
    position: relative;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
  }
  .i i {
    transition: 0.3s;
  }

  .form-list > div {
    position: relative;
    height: 45px;
  }

  .form-list > div > h5 {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    transition: 0.3s;
  }

  .form-list:before,
  .form-list:after {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: #38d39f;
    transition: 0.4s;
  }

  .form-list:before {
    right: 50%;
    content: "";
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: #38d39f;
  }

  .form-list:after {
    left: 50%;
    content: "";
    position: absolute;
    bottom: -2px;
    width: 0%;
    height: 2px;
    background-color: #38d39f;
  }

  .form-list.focus:before,
  .form-list.focus:after {
    width: 50%;
  }

  .form-list.focus > div > h5 {
    top: -5px;
    font-size: 15px;
  }

  .form-list.focus > .i > i {
    color: #38d39f;
  }

  .form-list > div > input {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    color: #555;
    font-family: "poppins", sans-serif;
  }
`;
