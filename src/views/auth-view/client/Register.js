import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Card, Col, Form, Input, Checkbox, Button, Space } from "antd"
import { FaUserAlt } from "react-icons/fa"
import { AiFillLock } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

import "./Register.css"
import "assets/css/custom-design.css"

function ClientRegister() {

    const divStyle = {
        height: "100vh",
        backgroundImage: "url('/img/background/green-wave.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "auto",
    }

    const leftLoginDiv = {
        paddingRight: "20px",
        backgroundImage: "url('/img/others/Videocall_Isometric.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundOrigin: "content-box",
        overflow: "hidden",
    }

    return (
        <div style={divStyle}>
            <Row className="h-100" justify='center' align="middle" >

                <Card className="register-card">

                    <Row gutter={70}>
                        <Col span={12} style={leftLoginDiv}>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ height: "auto" }}>
                            <h2 className='login-card-label'>Register</h2>
                            <Form layout='horizontal'>

                                <div className="form-input-field-style">
                                    <Form.Item
                                        label={<FaUserAlt />}
                                        labelAlign='left'
                                        required={false}
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input username',
                                            },
                                        ]}
                                    >
                                        <Input className="custom-input" placeholder='Username' />
                                    </Form.Item>
                                    <Form.Item
                                        label={<AiFillLock />}
                                        labelAlign='left'
                                        required={false}
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input password',
                                            },
                                        ]}
                                    >
                                        <Input.Password className="custom-input" type='password' placeholder='Password' />
                                    </Form.Item>
                                    <Form.Item
                                        label={<AiFillLock />}
                                        labelAlign='left'
                                        required={false}
                                        name="confirm_password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please type your password again.',
                                            },
                                        ]}
                                    >
                                        <Input.Password className="custom-input" type='password' placeholder='Confirm Password' />
                                    </Form.Item>
                                </div>


                                <Row className='w-100' align='between' justify="center">
                                    <Col xxl={14} xl={14} lg={12} md={12} sm={24} xs={24}>
                                        <Link to="/client/login" className="register-custom-link">Already have an account?</Link>
                                    </Col>
                                    <Col xxl={10} xl={10} lg={12} md={12} sm={24} xs={24} >
                                        <button className="custom-button-green sm-btn">Sign up</button>
                                    </Col>
                                </Row>


                            </Form>
                        </Col>
                    </Row>
                </Card>

            </Row >
        </div>
    )
}

export default ClientRegister