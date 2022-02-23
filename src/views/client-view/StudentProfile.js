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

function StudentProfile() {
  const { currentUser, updateProfile } = useAuth();
  const sid = localStorage.getItem("sid");
  const uid = localStorage.getItem("mid");
  const fullname = localStorage.getItem("fullname");

  const [user, setUser] = useState([]);
  const [initialVal, setInitialVal] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {

    (async () => {
      await Axios.get("/api/student/get/" + uid).then((response) => {
        const userData = response.data;
        setUser(userData);
      });

    })()


  }, []);

  const updateStudentName = async (values) => {
    updateProfile({ displayName: values.full_name })

    await Axios.put("/api/student/update", {
      values,
      sid,
      uid,
    })

    setUser({ ...user, full_name: values.full_name })
    localStorage.setItem("fullname", values.full_name)
    message.success("Student updated.");
  };

  useEffect(() => {
    setInitialVal({ ...initialVal, ...user });
  }, [user]);

  useEffect(() => {
    form.resetFields();
    console.log(initialVal)
  }, [initialVal]);

  // console.log(initialVal);

  return (
    <Row gutter={[30, 30]} className="user-profile">
      <Col xxl={{ span: 8, order: 1 }} xl={{ span: 8, order: 1 }} lg={{ span: 8, order: 1 }} md={24} sm={24} xs={24}>
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
            style={{ backgroundColor: "green", fontSize: "1.4rem" }}
          >
            {fullname != null &&
              utils.getNameInitial(fullname)
            }
          </Avatar>
          <h4 className="text-center">{fullname}</h4>
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
              onFinish={updateStudentName}
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
                        <Input className="custom-input" disabled />
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

export default StudentProfile;
