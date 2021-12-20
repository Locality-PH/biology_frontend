import React from "react";
import "./UserProfile.css"
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload, Card, } from 'antd';

function UserProfileTest() {
  return (
    <Row gutter={30} className="user-profile-container">
      <Col span={16}>
        <Card className="card-box-shadow-style">
          <div className="">

            <h4>Personal Information</h4><hr />
            <Form
              name="basicInformation"
              layout="vertical"
            >
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row gutter={10}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Name: </p>}
                        name="name"
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
                        label={<p className="label-form-style">Username: </p>}
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your username!'
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
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Phone Number: </p>}
                        name="phoneNumber"
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Website: </p>}
                        name="website"
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <Form.Item
                        label={<p className="label-form-style">Address: </p>}
                        name="address"
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">City: </p>}
                        name="city"
                      >
                        <Input className="form-input-style" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item
                        label={<p className="label-form-style">Post Code: </p>}
                        name="postcode"
                      >
                        <Input className="form-input-style" />
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
          <Avatar src={require("assets/img/faces/face-3.jpg").default} className="profile-picture-style" />
          <h4 className="text-center">Mike Andrew</h4>
          <p className="text-center">michael24</p>
          <p className=" text-center">
            "3rd year College Student <br></br>
            Your chick she so thirsty <br></br>
            I'm in that two seat Lambo"
          </p>

        </Card>
      </Col>
    </Row>
  );
}

export default UserProfileTest;
