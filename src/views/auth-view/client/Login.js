import React from 'react'
import { Row, Card, Col, Form, Input, Checkbox, Button, Space } from "antd"
import { FaUserAlt } from "react-icons/fa"
import { AiFillLock } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

import "./Login.css"


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
    return (
        <div style={divStyle}>
            <Row className="h-100" justify='center' align="middle" >

                <Card className="login-card">

                    <Row gutter={70}>

                        <Col span={12} style={{ height: "auto" }}>
                            <h2 className='login-card-label'>Login</h2>
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
                                </div>

                                <Space className='w-100' direction='vertical'>
                                    <Row className='w-100' align='between'>
                                        <Col span={12}>
                                            <Checkbox>Remember me</Checkbox>
                                        </Col>
                                        <Col span={12} >
                                            <button className="custom-button">Sign in</button>
                                        </Col>
                                    </Row>

                                    <div className='w-100 center-div login-with'>
                                        <Space align='center'>
                                            <p className='m-0'>Login with: </p>
                                            <button className='custom-button-white'><FcGoogle /></button>
                                        </Space>
                                    </div>
                                </Space>

                            </Form>
                        </Col>
                        <Col span={12} style={rightLoginDiv}>

                        </Col>
                    </Row>
                </Card>

            </Row >

        </div >
    )
}

export default ClientLogin
