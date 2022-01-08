import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio } from 'antd'
import "assets/css/app-views/Quiz/CreateQuiz.css"

const QuizTemplate = () => {

    return (
        <div className='create-quiz'>

            <Card className='card-box-shadow-style question-card center-div'>
                <Input value={question.String} placeholder='Question here....' className='underline-input' />
                <Input placeholder='Answer' className='underline-input' />
            </Card>

            <Card className='card-box-shadow-style question-card center-div'>
                <Input className='title underline-input' placeholder='Quiz Title' value={tempQuiz.Name} />
                <Input className='underline-input' placeholder='Description here....' value={tempQuiz.Description} />
            </Card>

            <Card className='card-box-shadow-style question-card center-div'>
                <Input placeholder='Question here....' className='underline-input' />
                <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                        <Col span={24}>
                            <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="E">E</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Card>


            <Card className='card-box-shadow-style question-card center-div'>
                <Input placeholder='Question here....' className='underline-input' />
                <Radio.Group >
                    <Row>
                        <Col span={24}>
                            <Radio value={1}>A</Radio>
                        </Col>
                        <Col span={24}>
                            <Radio value={2}>B</Radio>
                        </Col>
                        <Col span={24}>
                            <Radio value={3}>C</Radio>
                        </Col>
                        <Col span={24}>
                            <Radio value={4}>D</Radio>
                        </Col>
                    </Row>
                </Radio.Group>
            </Card>


            <div className="center-div" style={{ marginTop: "20px" }}>
                <Button>Add Question</Button>
            </div>

        </div>
    )
}

export default QuizTemplate
