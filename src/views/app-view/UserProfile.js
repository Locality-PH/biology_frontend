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


function UserProfile() {
  const { currentUser, updateProfile} = useAuth();
  const teacherID = localStorage.getItem("tid");
  const userID = localStorage.getItem("mid");

  const [user, setUser] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [initialVal, setInitialVal] = useState([]);

  const [form] = Form.useForm();

  console.log("current user:", currentUser)


  useEffect(() => {

    (async () => {
      await Axios.get("/api/admin/" + userID).then((response) => {
        const userData = response.data;
        setUser(userData);
      });
  
    })()


  }, []);

  const updateTeacher = async (values) => {
    updateProfile({displayName: values.full_name})

    await Axios.put("/api/teacher/update", {
      values,
      teacherID,
      userID,
    }).then((response) => {
      console.log(response.data);
    });

    message.success("Teacher updated.");
  };

  useEffect(() => {
    setInitialVal({ ...initialVal, ...user });
    console.log("useEffect", user)
  }, [user]);

  useEffect(() => {
    form.resetFields();
  }, [initialVal]);

  // console.log(initialVal);

  return (
    <Row gutter={[30,30]} className="user-profile">
       <Col xxl={{span: 8, order: 1}} xl={{span: 8, order: 1}} lg={{span: 8, order: 1}} md={24} sm={24} xs={24}>
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
            style={{ backgroundColor: "green", fontSize: "1.4rem"}}
          >
            {utils.getNameInitial(currentUser?.displayName)}{" "}
          </Avatar>
          <h4 className="text-center">{user?.full_name}</h4>
        </Card>
      </Col>

      <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
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
                <Col span={24}>
                  <Row gutter={10} className="form-row-style">
                    <Col span={24} xl={12}>
                      <Form.Item
                        label={<p className="label-form-style">Full Name: </p>}
                        name="full_name"
                        required={false}
                        rules={[
                          {
                            required: true,
                            message: "Full name can't be empty!",
                          },
                        ]}
                      >
                        <Input className="custom-input" />
                      </Form.Item>
                    </Col>
                    <Col span={24} xl={12}>
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
                        <Input className="custom-input" disabled/>
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

    </Row>
  );
}

export default UserProfile;
