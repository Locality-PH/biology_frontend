import React, { useEffect, useState } from "react";
import "./UserProfile.css"
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Card, } from 'antd';
import Axios from "axios"


function UserProfileTest() {
  const [teacherID, setTeacherID] = useState("61c13a75cfd6f1012a2bd15f")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [initialVal, setInitialVal] = useState([])

  useEffect( () => {

    Axios.get("http://localhost:5000/teacher/get/" + teacherID).then(
      (response) => {
        console.log(response.data);
      }
    )
  }, [])

  const updateTeacher = async (values) => {
    await Axios.put(
      "http://localhost:5000/teacher/update",
      { values }
    ).then((response) => {
      console.log(response.data);
    })

    //alert("Teacher updated");
  }


  return (
    <Row gutter={30} className="user-profile-container">
      <Col span={16}>
        <Card className="card-box-shadow-style">
          <div className="">

            <h4>Personal Information</h4><hr />
            <Form
              name="basicInformation"
              layout="vertical"
              onFinish={updateTeacher}
              initialValues={initialVal}
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={10}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">First Name: </p>}
                        name="first_name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                        ]}
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Last Name: </p>}
                        name="last_name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your lastname!'
                          },
                        ]}
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Email: </p>}
                        name="email"
                        rules={[{
                          required: true,
                          type: 'email',
                          message: 'Please enter a valid email!'
                        }]}
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Date of Birth: </p>}
                        name="dateOfBirth"
                      >
                        <DatePicker className="w-100 form-input-style" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" className="form-submit-btn-style">
                    Save Change
                  </Button>
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
              src={require("assets/img/photo-1431578500526-4d9613015464.jpeg").default}
              style={{ height: "150px", objectFit: "cover" }}
            />
          }
        >
          <Avatar src={require("assets/img/faces/face-0.jpg").default} className="profile-picture-style" />
          <h4 className="text-center">Mike Andrew</h4>
          <p className="text-center">michael24</p>

        </Card>
      </Col>
    </Row>
  );
}

export default UserProfileTest;
