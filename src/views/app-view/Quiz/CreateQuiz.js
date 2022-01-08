import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "assets/css/app-views/Quiz/CreateQuiz.css"

const CreateQuiz = () => {
    const formRef = React.createRef();

    const tempQuiz = {
        Qid: 1,
        Name: "Quiz 1",
        Description: "Dis is the description.",
        Question: [
            {
                id: 1,
                String: "This is the test question 1",
                Type: "Identification",
                Answer: [
                    "Test"
                ],
                Option: [null]
            },
            {
                id: 2,
                String: "This is a test question 2",
                Type: "Multiple Choice",
                Answer: [
                    "Choose me",
                ],
                Option: [
                    "Choose me",
                    "Don't choose me either",
                    "Don't choose me"
                ]
            },
            {
                id: 3,
                String: "This is a test question 3",
                Type: "Checkbox",
                Answer: [
                    "Choose me",
                    "Choose me too!",
                ],
                Option: [
                    "Choose me",
                    "Choose me too!",
                    "Don't choose me"
                ]
            },
        ]
    }

    const [quiz, setQuiz] = useState(tempQuiz)
    const [question, setQuestion] = useState(tempQuiz.Question)

    const tempInitialVal = []
    question.map((question, i) => {
        tempInitialVal.push({ ["question" + [i + 1]]: question.String })

        let optionArray = []

        question.Option.map(
            (option) => {
                optionArray.push({option, isAnswer: false})
            })
        
        console.log("option for question " + [i + 1])
        console.log(optionArray)

        tempInitialVal.push({ ["question" + [i + 1] + "_options"] : optionArray})
    })

    let initialVal = tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {})
    // initialVal = Object.assign(initialVal, initialValuesOptions)

    console.log(tempQuiz)
    console.log(initialVal)

    const newQuestion = {
        String: "This is a test question 3",
        Type: "Checkbox",
        Answer: [
            "Choose me"
        ],
        Option: [
            "Choose me",
            "Choose me too!",
            "Don't choose me"
        ]
    }

    const setIsAnswer = (Qkey) => {
        let temp_options = formRef.current.getFieldValue("question2_options");

        temp_options = temp_options.map((option, option_key) => {
            if (option_key === Qkey) {
                option.isAnswer = true;
            } else {
                option.isAnswer = false;
            }
            return option;
        });

        formRef.current.setFieldsValue({ temp_options });
    };

    const AddQuestion = () => {
        setQuestion(question.concat(newQuestion))
    }

    const PrintQuestion = () => {
        return (
            question.map((question, key) => {
                key += 1

                if (question.Type == "Identification") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={key}>
                            <Form.Item
                                className='mb-0'
                                name={"question" + key}
                                colon={false}
                                label={key + "."}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>


                            <Form.Item
                                name={"question" + key + "-option"}
                            >
                                <Input placeholder='Answer' className='underline-input' />
                            </Form.Item>
                        </Card>
                    )
                } else if (question.Type == "Multiple Choice") {
                    const Qkey = key;
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={Qkey}>

                            <Form.Item
                                className='mb-0'
                                name={"question" + Qkey}
                                colon={false}
                                label={key + "."}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

                            <Form.List
                                name={"question" + Qkey + "_options"}
                            >

                                {(fields, { add, remove }) => (

                                    <>
                                        {fields.map(({ key, name, ...restField }) => (

                                            <Space key={key} style={{ width: "100%", marginBottom: 8 }} align='middle'>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "isAnswer"]}
                                                    className='mb-0'
                                                    valuePropName="checked"
                                                >
                                                    <Radio onChange={() =>
                                                        setIsAnswer(key)
                                                    } />
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "option"]}
                                                    rules={[{ required: true, message: 'Missing Option Value' }]}
                                                    className='mb-0'
                                                >
                                                    <Input placeholder="Option here" />
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    onClick={
                                                        () => {
                                                            remove(name)
                                                            console.log("removing" + name)
                                                        }} />
                                            </Space>


                                        ))}

                                        <Form.Item className='mb-0'>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add Option
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}


                            </Form.List>
                        </Card>
                    )
                } else if (question.Type == "Checkbox") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={key}>
                            <Form.Item
                                className='mb-0'
                                name={"question" + key}
                                colon={false}
                                label={key + "."}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    {
                                        question.Option.map(
                                            (option, key) => {
                                                return (
                                                    <Col span={24} key={key}>
                                                        <Checkbox value={option}><Input defaultValue={option} /></Checkbox>
                                                    </Col>
                                                )
                                            }
                                        )
                                    }
                                </Row>
                            </Checkbox.Group>
                        </Card>
                    )
                }
            })
        )
    }

    const ShowQuestion = () => {
        console.log(question);
    };

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const dynamicVal = (key) => {
        const defaultVal = ["option 1", "option 2", "option 3"]

        return defaultVal[key]
    };


    return (
        <div className='create-quiz'>
            {/* CreateQuiz {questionLenght} */}

            <Form name="quiz-form" onFinish={onFinish} initialValues={initialVal} ref={formRef}>

                {PrintQuestion()}

                <div className='center-div mb-4'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>

            <Card className='card-box-shadow-style question-card center-div'>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'isAnswer']}
                                            className='mb-0'
                                            valuePropName="checked"
                                        >
                                            <Radio />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'first']}
                                            rules={[{ required: true, message: 'Missing first name' }]}
                                            initialValue={dynamicVal(key)}
                                        >
                                            <Input placeholder="First Name" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'last']}
                                            rules={[{ required: true, message: 'Missing last name' }]}
                                        >
                                            <Input placeholder="Last Name" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={
                                                () => {
                                                    remove(name)
                                                    console.log("removing" + name)
                                                }} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        block icon={<PlusOutlined />}
                                        onClick={() => {
                                            add()
                                            console.log("adding" + fields)
                                        }
                                        }
                                    >
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <div className="center-div" style={{ marginTop: "20px" }}>
                <Button onClick={(e) => AddQuestion()}>Add Question</Button>
            </div>

            <div className="center-div" style={{ marginTop: "20px" }}>
                <Button onClick={(e) => ShowQuestion()}>Show Question</Button>
            </div>

        </div>
    )
}

export default CreateQuiz
