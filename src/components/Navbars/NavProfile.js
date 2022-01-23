import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar, Modal, Button, Input, message } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  FolderOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";
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
  const currentUrl = window.location.pathname;
  const studentId = localStorage.getItem("sid");
  const [studentName, setStudentName] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    axios
      .get("/api/student/get-student-fullname/" + studentId)
      .then((response) => {
        setStudentName(response.data);
        console.log(response.data);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/client/login");
    } catch {
      setError("Failed to log out");
    }
  }
  async function JoinClassRoomButton() {
    setIsDisable(false);
    setModalVisible(true);
  }

  const joinClassroom = () => {
    setIsDisable(true);
    console.log("classCode: ", classCode);
    console.log("Student id", studentId);
    setModalVisible(false);
    message.loading(`Joining "${classCode}" classroom...`, 0);

    const data = {
      student_id: studentId,
      class_code: classCode,
      student_name: studentName,
    };

    axios
      .post("/api/student/join-classroom", data)
      .then((response) => {
        if (response.data == "Error") {
          message.destroy();
          message.error("Couldn't find classroom please try again");
        } else {
          message.destroy();
          message.success(response.data);
          if (response.data == "Successfully join the classroom") {
            location.reload();
          }
        }
      })
      .catch(() => {
        message.destroy();
        message.error("Error!");
      });
  };
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
          {currentUrl.match("/classroom") ? (
            <>
              {" "}
              <Menu.Item
                key={menuItem.length + 2}
                onClick={() => {
                  // Module();
                }}
              >
                {" "}
                <a href="#/">
                  <FolderOutlined className="mr-3" />
                  <span className="font-weight-normal">Module</span>
                </a>
              </Menu.Item>{" "}
              <Menu.Item
                key={menuItem.length + 3}
                onClick={() => {
                  // Module();
                }}
              >
                {" "}
                <a href="#/">
                  <UserOutlined className="mr-3" />
                  <span className="font-weight-normal">Student</span>
                </a>
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              key={menuItem.length + 4}
              onClick={() => {
                JoinClassRoomButton();
              }}
            >
              {" "}
              <a href="#/">
                <PlusOutlined className="mr-3" />
                <span className="font-weight-normal">Join Classroom</span>
              </a>
            </Menu.Item>
          )}

          <Menu.Item
            key={menuItem.length + 5}
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
    <>
      <Modal
        title="Enter the code provided by your teacher"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            key={1}
            type="primary"
            style={{ backgroundColor: "green", borderColor: "green" }}
            onClick={() => joinClassroom()}
            disabled={isDisable}
          >
            Join
          </Button>,
        ]}
      >
        <Input
          placeholder="Example: abcmopxyz"
          onChange={(e) => setClassCode(e.target.value)}
        ></Input>
      </Modal>
      <Dropdown
        placement="bottomRight"
        overlay={profileMenu}
        trigger={["click"]}
      >
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
    </>
  );
};

export default NavProfile;
