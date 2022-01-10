import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import "assets/css/app-views/Quiz/CreateQuiz.css"

const { Option } = Select;

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
                    { option: "Choose me", isAnswer: true },
                    { option: "Don't choose me either", isAnswer: false },
                    { option: "Don't choose me", isAnswer: false }
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
                    { option: "Choose me", isAnswer: true },
                    { option: "Choose me too!", isAnswer: true },
                    { option: "Don't choose me", isAnswer: false }
                ]
            },
        ]
    }

    const [quiz, setQuiz] = useState(tempQuiz)
    const [question, setQuestion] = useState(tempQuiz.Question)

    //Initialize default value here
    const tempInitialVal = [
        {quiz_type: "Identification"}
    ]

    question.map((question, i) => {
        tempInitialVal.push({ ["question" + [i + 1]]: question.String })

        let optionArray = []

        question.Option.map(
            (option) => {
                if (option != null) {
                    optionArray.push(option)
                }
            })

        console.log("option for question " + [i + 1])
        console.log(optionArray)

        tempInitialVal.push({ ["question" + [i + 1] + "_options"]: optionArray })
    })

    let initialVal = tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {})
    // initialVal = Object.assign(initialVal, initialValuesOptions)

    console.log(tempQuiz)
    console.log(initialVal)

    const setIsAnswer = (key, Qkey) => {
        let temp_options = formRef.current.getFieldValue("question" + Qkey + "_options");
        // console.log(key, Qkey)
        // console.log(temp_options)

        temp_options = temp_options.map((option, option_key) => {
            if (option_key == key) {
                option.isAnswer = true;
            } else {
                option.isAnswer = false;
            }
            return option;
        });

        formRef.current.setFieldsValue({ temp_options });
    };

    const AddQuestion = (quiz_type) => {
        console.log("add Question")
        console.log(question.length)

        let newQid = question.length + 1

        const newQuestion = {
            String: "This is a test question " + newQid,
            Type: quiz_type,
            Answer: [null],
            Option: [null]
        }

        console.log(newQuestion)
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
                                rules={[{ required: true, message: "Question can't be blank!" }]}
                                required={false}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>


                            <Form.Item
                                name={"question" + key + "-options"}
                                rules={[{ required: true, message: "Need answer for this question!" }]}
                                required={false}
                            >
                                <Input prefix={<b>Answer:</b>} />
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
                                rules={[{ required: true, message: "Question can't be blank!" }]}
                                required={false}
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
                                                    initialValue={false}
                                                >
                                                    <Radio onChange={() =>
                                                        setIsAnswer(key, Qkey)
                                                    } />
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "option"]}
                                                    rules={[{ required: true, message: 'Put option here!' }]}
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

                                        <Form.Item className='mb-0 center-div'>
                                            <Button type="dashed" block onClick={() => add()} >
                                                <Space size={4} align='middle'>
                                                    <AiOutlinePlus /> <p>Add Option</p>
                                                </Space>
                                            </Button>

                                        </Form.Item>
                                    </>
                                )}


                            </Form.List>
                        </Card>
                    )
                } else if (question.Type == "Checkbox") {
                    const Qkey = key;

                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={Qkey}>

                            <Form.Item
                                className='mb-0'
                                name={"question" + Qkey}
                                colon={false}
                                label={key + "."}
                                rules={[{ required: true, message: "Question can't be blank!" }]}
                                required={false}
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
                                                // initialValue={false}
                                                >
                                                    <Checkbox />
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "option"]}
                                                    rules={[{ required: true, message: 'Need option here!' }]}
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
                                            <Button type="dashed" block onClick={() => add()} >
                                                <Space size={4} align='middle'>
                                                    <AiOutlinePlus /> <p>Add Option</p>
                                                </Space>
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}


                            </Form.List>
                        </Card>
                    )
                }
            })
        )
    }

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

            <Form name="quiz-form" onFinish={onFinish} initialValues={initialVal} ref={formRef} scrollToFirstError={true}>

                {PrintQuestion()}

                <div className="center-div mb-4" style={{ marginTop: "20px" }}>
                    <Button onClick={(e) => AddQuestion(formRef.current.getFieldValue("quiz_type"))}>Add Question</Button>

                    <Form.Item noStyle name="quiz_type">
                        <Select style={{ width: 150, marginLeft: 10 }}>
                            <Option value="Identification">Identification</Option>
                            <Option value="Multiple Choice">Multiple Choice</Option>
                            <Option value="Checkbox">Checkbox</Option>
                        </Select>
                    </Form.Item>

                </div>

                <div className='center-div mb-4'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>

        </div>
    )
}

export default CreateQuiz
