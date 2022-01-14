import React, { useEffect, useState } from "react";
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from "antd";
import Axios from "axios";
import utils from "utils";
import { useAuth } from "contexts/AuthContext";

import "assets/css/app-views/UserProfile.css"
import "assets/css/custom-design.css"
import AvatarProfile from "components/shared-components/AvatarProfile/AvatarProfile";


function UserProfileTest() {
  const { currentUser } = useAuth();
  const [teacherID, setTeacherID] = useState("");
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [initialVal, setInitialVal] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    const teacherID = localStorage.getItem("tid");
    const userID = localStorage.getItem("mid");
    // const userID = "61c287d146f87f872634f860";

    console.log("current user:")
    console.log(currentUser)

    console.log("Teacher ID: " + teacherID);
    console.log("user ID: " + userID);

    setTeacherID(teacherID);
    setUserID(userID);

    (async () => {
      await Axios.get("http://localhost:5000/admin/" + userID).then((response) => {
        const userData = response.data;
        setUser(userData);
      });
  
      // await Axios.get("http://localhost:5000/teacher/get/" + teacherID).then(
      //   (response) => {
      //     const teacherData = response.data;
      //     setTeacher(teacherData);
      //   }
      // );
    })()


  }, []);

  const updateTeacher = async (values) => {
    await Axios.put("http://localhost:5000/teacher/update", {
      values,
      teacherID,
      userID,
    }).then((response) => {
      console.log(response.data);
    });

    alert("Teacher updated");
  };

  useEffect(() => {
    setInitialVal({ ...initialVal, ...teacher });
  }, [teacher]);

  useEffect(() => {
    setInitialVal({ ...initialVal, ...user });
  }, [user]);

  useEffect(() => {
    form.resetFields();
    console.log(initialVal)
  }, [initialVal]);

  // console.log(initialVal);

  return (
    <Row gutter={30} className="user-profile">
      <Col span={16}>
        <Card className="card-box-shadow-style">
          <div className="">
            <h4>Personal Information</h4>
            <hr />
            <Form
              name="basicInformation"
              layout="vertical"
              onFinish={updateTeacher}
              initialValues={initialVal}
              form={form}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={10} className="form-row-style">
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">First Name: </p>}
                        name="first_name"
                        required={false}
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Last Name: </p>}
                        name="last_name"
                        required={false}
                        rules={[
                          {
                            required: true,
                            message: "Please input your lastname!",
                          },
                        ]}
                      >
                        <Input className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Email: </p>}
                        name="email"
                        required={false}
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Please enter a valid email!",
                          },
                        ]}
                      >
                        <Input className="custom-input" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <button
                    type="submit"
                    className="form-submit-btn-style custom-button-green"
                  >
                    Save Change
                  </button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </Col>

      <Col span={8}>
        <Card
          className="card-box-shadow-style"
          cover={
            <img
              alt="example"
              src={
                require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                  .default
              }
              style={{ height: "150px", objectFit: "cover" }}
            />
          }
        >

          <Avatar
            className="profile-picture-style"
            size={70}
            src={currentUser?.photoURL}
            style={{ backgroundColor: "green" }}
          >
            {utils.getNameInitial(currentUser?.displayName)}{" "}
          </Avatar>
          <h4 className="text-center">{currentUser?.displayName}</h4>
          <p className="text-center">michael24</p>
        </Card>
      </Col>
    </Row>
  );
}

export default UserProfileTest;
