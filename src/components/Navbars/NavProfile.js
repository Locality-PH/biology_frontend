import React, { useState } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import Icon from "components/util-components/Icon";

import utils from "utils";
import { useAuth } from "contexts/AuthContext";

const menuItem = [
  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/client/login");
    } catch {
      setError("Failed to log out");
    }
  }
  async function JoinClassRoom() {
    console.log("Join");
  }
  const profileMenu = (
    <div className="pt-2 pl-5 pr-5 nav-profile nav-dropdown white-avatar hover-underline-animation ">
      <div className="nav-profile-header">
        <div className=" d-flex">
          {/* <Avatar
            src={currentUser?.photoURL}
            size={45}
            style={{ backgroundColor: "green" }}
          >
            {} {utils.getNameInitial("von.aralar@gmail.com")}
          </Avatar> */}
          <div className="text-center ">
            <h4 className="mb-0">VON MANIQUIS</h4>
            <span className="text-muted">Student</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key={menuItem.length + 2}
            onClick={() => {
              JoinClassRoom();
            }}
          >
            {" "}
            <a href="#/">
              <PlusOutlined className="mr-3" />
              <span className="font-weight-normal">Join Classroom</span>
            </a>
          </Menu.Item>
          <Menu.Item
            key={menuItem.length + 1}
            onClick={() => {
              handleLogout();
            }}
          >
            <a href="#/">
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </a>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu
        className="d-flex align-item-center hover-underline-animation "
        mode="horizontal"
      >
        <Menu.Item key="profile ">
          <Avatar
            size={55}
            src={currentUser?.photoURL}
            style={{ backgroundColor: "green" }}
          >
            {utils.getNameInitial("von.aralar@gmail.com")}{" "}
          </Avatar>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavProfile;
