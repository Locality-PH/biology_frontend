import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Card, Col, Form, Input, Checkbox, Button, Space } from "antd"
import { FaUserAlt } from "react-icons/fa"
import { AiFillLock } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

import "./Login.css"
import "assets/css/custom-design.css"


function ClientLogin() {

    const divStyle = {
        height: "100vh",
        backgroundImage: "url('/img/background/green-wave.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "auto",
    }

    const rightLoginDiv = {
        paddingRight: "20px",
        backgroundImage: "url('/img/others/Online_presentation_Isometric.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundOrigin: "content-box",
        overflow: "hidden",
    }

    const handleForm = (values) => {
        console.log(values)
    }

    return (
        <div style={divStyle}>
            <Row className="h-100" justify='center' align="middle" >

                <Card className="login-card">

                    <Row gutter={70}>

                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ height: "auto" }}>
                            <h2 className='login-card-label'>Login</h2>
                            <Form
                                layout='horizontal'
                                onFinish={handleForm}
                            >

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
                                </div>

                                <Space className='w-100' direction='vertical'>
                                    <Row className='w-100' align='between' justify="center" style={{ marginBottom: "15px" }}>
                                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                            <Checkbox className='remember-me-style'>Remember me</Checkbox>
                                        </Col>
                                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} >
                                            <button className="custom-button-green sm-btn">Sign in</button>
                                        </Col>
                                    </Row>

                                    <div className='w-100 center-div login-with'>
                                        <Space>
                                            <p className='m-0'>Login with: </p>
                                            <button className='custom-button-white'><FcGoogle /></button>
                                        </Space>
                                    </div>

                                    <div className="center-div">
                                        <Link to="/client/register" className="login-custom-link">Create an account</Link>
                                    </div>
                                </Space>

                            </Form>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0} style={rightLoginDiv}>
                        </Col>
                    </Row>
                </Card>

            </Row >

        </div >
    )
}

export default ClientLogin
