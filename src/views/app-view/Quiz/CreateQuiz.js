import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"

import "assets/css/app-views/Quiz/CreateQuiz.css"
import Axios from 'axios';

const { Option } = Select;

const CreateQuiz = () => {
    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [newQuizType, SetNewQuizType] = useState("Identification")

    const tempQuiz = {
        Qid: 1,
        name: "Quiz 1",
        description: "Dis is the description.",
        question: [
            {
                string: "This is the test question 1",
                type: "Identification",
                answer:
                    ["Test"]
                ,
                option: "Test Answer"
            },
            {
                string: "This is a test question 2",
                type: "Multiple Choice",
                answer: [
                    "Choose me",
                ],
                option: [
                    { value: "Choose me", isAnswer: true },
                    { value: "Don't choose me either", isAnswer: false },
                    { value: "Don't choose me", isAnswer: false }
                ]
            },
            {
                string: "This is a test question 3",
                type: "Checkbox",
                answer: [
                    "Choose me",
                    "Choose me too!",
                ],
                option: [
                    { value: "Choose me", isAnswer: true },
                    { value: "Choose me too!", isAnswer: true },
                    { value: "Don't choose me", isAnswer: false }
                ]
            },
        ]
    }

    const [quiz, setQuiz] = useState(tempQuiz)
    const [question, setQuestion] = useState(tempQuiz.question)

    useEffect(() => {
        form.resetFields();
    }, [question])

    //Initialize default value here
    const tempInitialVal = [
        { quiz_name: quiz.name },
        { quiz_description: quiz.description }
    ]

    question.map((question, i) => {
        tempInitialVal.push({ ["question" + [i + 1]]: question.string })

        if (question.option != undefined) {

            if (typeof question.option == 'string') {
                tempInitialVal.push({["question" + [i + 1] + "_options"]:question.option})
            }

            else {
                let optionArray = []

                question.option.map(
                    (option) => {
                        if (option != null) {
                            optionArray.push(option)
                        }
                    })

                tempInitialVal.push({ ["question" + [i + 1] + "_options"]: optionArray })
            }
        }

    })

    // console.log("tempInitialVal values: " + tempInitialVal)

    let initialVal = tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {})
    // initialVal = Object.assign(initialVal, initialValuesOptions)

    console.log("Initial values: ", initialVal)

    const setIsAnswer = (key, QTNkey) => {
        let temp_options = formRef.current.getFieldValue("question" + QTNkey + "_options");
        // console.log(key, QTNkey)
        // console.log(temp_options)

        temp_options = temp_options.map((option, option_key) => {
            if (option == undefined) {
                option = { isAnswer: false };
            }
            else if (option_key == key) {
                option["isAnswer"] = true;
            } else {
                option["isAnswer"] = false;
            }
            return option;
        });

        formRef.current.setFieldsValue(temp_options);
    };

    const addQuestion = () => {
        let quiz_type = newQuizType

        let newQuestion = {
            string: "This is a new test question ",
            type: quiz_type,
            answer: [null],
            option: [null]
        }

        let currentFormData = form.getFieldsValue(true)
        currentFormData = updateForm(currentFormData)
        newQuestion = currentFormData.question.concat(newQuestion)

        // console.log("newQuestion")
        // console.log(newQuestion)
        setQuestion(newQuestion)

    }

    const removeQuestion = (QTNkey) => {
        // minus 1 for array
        QTNkey--

        let currentFormData = form.getFieldsValue(true)

        // console.log(QTNkey)
        // console.log(currentFormData)

        currentFormData = updateForm(currentFormData)
        // splice (remove this index, how many to remove)
        currentFormData.question.splice(QTNkey, 1)
        // console.log("From remove question")
        // console.log(currentFormData)

        setQuestion(currentFormData.question)
    }

    const updateForm = (values) => {
        let quiz_length = (Object.keys(values).length - 2) / 3;
        let newQuiz = {}

        newQuiz["name"] = values["quiz_name"]
        newQuiz["description"] = values["quiz_description"]
        newQuiz["question"] = []

        for (let i = 1; i < quiz_length + 1; i++) {
            let newQuestion = {}
            let newOptions = values["question" + i + "_options"]

            // console.log("test here")
            // console.log(newOptions)

            newQuestion["option"] = newOptions
            newQuestion["type"] = values["question" + i + "_type"]
            newQuestion["string"] = values["question" + i]
            newQuestion["answer"] = []

            if (newOptions != undefined) {
                if (newOptions.length == 1) {
                    if (newOptions[0] != undefined) {
                        newQuestion["answer"].push(newOptions[0])
                    }
                }

                else {

                    for (let x = 0; x < newOptions.length; x++) {
                        if (newOptions[x] != undefined) {
                            if (newOptions[x].isAnswer == true) {
                                newQuestion["answer"].push(newOptions[x].value)
                            }
                        }

                    }

                }
            }

            newQuiz["question"].push(newQuestion)

        }
        // console.log("updateForm")
        // console.log(newQuiz)

        return newQuiz
    };

    const changeQuizType = (value) => {
        SetNewQuizType(value)
    }

    const PrintQuestion = () => {
        return (
            question.map((question, key) => {
                key += 1
                let QTNkey = key;

                if (question.type == "Identification") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(QTNkey)}
                            />

                            <Form.Item
                                name={"question" + key + "_type"}
                                initialValue={"Identification"}
                                hidden={true}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

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
                                name={"question" + key + "_options"}
                                rules={[{ required: true, message: "Need answer for this question!" }]}
                                required={false}
                            >
                                <Input prefix={<b>Answer:</b>} />
                            </Form.Item>
                        </Card>
                    )
                } else if (question.type == "Multiple Choice") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(QTNkey)}
                            />

                            <Form.Item
                                name={"question" + key + "_type"}
                                initialValue={"Multiple Choice"}
                                hidden={true}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

                            <Form.Item
                                className='mb-0'
                                name={"question" + QTNkey}
                                colon={false}
                                label={key + "."}
                                rules={[{ required: true, message: "Question can't be blank!" }]}
                                required={false}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

                            <Form.List
                                name={"question" + QTNkey + "_options"}
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
                                                    <Radio onChange={() =>
                                                        setIsAnswer(key, QTNkey)
                                                    } />
                                                </Form.Item>

                                                <Form.Item
                                                    {...restField}
                                                    name={[name, "value"]}
                                                    rules={[{ required: true, message: 'Put option here!' }]}
                                                    className='mb-0'
                                                >
                                                    <Input placeholder="Option here" />
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    onClick={
                                                        () => {
                                                            remove(name)
                                                            // console.log("removing" + name)
                                                        }} />
                                            </Space>


                                        ))}

                                        <Form.Item className='mb-0 center-div'>
                                            <Button type="dashed" block onClick={() => { add() }} >
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
                } else if (question.type == "Checkbox") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(QTNkey)}
                            />

                            <Form.Item
                                name={"question" + key + "_type"}
                                initialValue={"Checkbox"}
                                hidden={true}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>


                            <Form.Item
                                className='mb-0'
                                name={"question" + QTNkey}
                                colon={false}
                                label={key + "."}
                                rules={[{ required: true, message: "Question can't be blank!" }]}
                                required={false}
                            >
                                <Input placeholder='Question here....' className='underline-input' />
                            </Form.Item>

                            <Form.List
                                name={"question" + QTNkey + "_options"}
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
                                                    name={[name, "value"]}
                                                    rules={[{ required: true, message: 'Need option here!' }]}
                                                    className='mb-0'
                                                >
                                                    <Input placeholder="Option here" />
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    onClick={
                                                        () => {
                                                            remove(name)
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

    const onFinish = async (values) => {
        let quiz_length = (Object.keys(values).length - 2) / 3;
        let newQuiz = {}

        console.log('Received values of form:', values);

        newQuiz["name"] = values["quiz_name"]
        newQuiz["description"] = values["quiz_description"]
        newQuiz["question"] = []

        for (let i = 1; i < quiz_length + 1; i++) {
            let newQuestion = {}
            let newOptions = values["question" + i + "_options"]

            newQuestion["option"] = newOptions
            newQuestion["type"] = values["question" + i + "_type"]
            newQuestion["string"] = values["question" + i]
            newQuestion["answer"] = []

            if (newOptions.length == 1) {
                newQuestion["answer"].push(newOptions[0])
                // console.log("Answer: " + newOptions)
            }

            else {

                for (let x = 0; x < newOptions.length; x++) {
                    if (newOptions[x].isAnswer == true) {
                        newQuestion["answer"].push(newOptions[x].value)
                        // console.log("Answer: " + newOptions[x].value)
                    }
                }

            }

            newQuiz["question"].push(newQuestion)
        }

        console.log("Quiz before submit" + newQuiz)
        // (async () => {
        //     console.log(newQuiz)
        //     await Axios.post("http://localhost:5000/quiz/create-quiz", { newQuiz }).then((response) => {
        //         console.log(response.data)
        //     });

        // })()
    };

    const dynamicVal = (key) => {
        const defaultVal = ["option 1", "option 2", "option 3"]

        return defaultVal[key]
    };


    return (
        <div className='create-quiz'>
            {/* CreateQuiz {questionLenght} */}

            <Form
                name="quiz-form"
                onFinish={onFinish}
                initialValues={initialVal}
                ref={formRef}
                form={form}
                scrollToFirstError={true}
            >

                <Card className='card-box-shadow-style question-card center-div'>
                    <Form.Item
                        className='mb-0'
                        name="quiz_name"
                        colon={false}
                        rules={[{ required: true, message: "Quiz Name can't be blank!" }]}
                        required={false}
                    >
                        <Input placeholder='Quiz Name' className='underline-input quiz-name-input' />
                    </Form.Item>


                    <Form.Item
                        name="quiz_description"
                        // rules={[{ required: true, message: "Need answer for this question!" }]}
                        required={false}
                    >
                        <Input.TextArea placeholder="Description..." autoSize={{ minRows: 1, maxRows: 4 }} />
                    </Form.Item>
                </Card>

                {PrintQuestion()}

                <div className="center-div mb-4" style={{ marginTop: "20px" }}>
                    <Button onClick={(e) => addQuestion()}>Add Question</Button>

                    <Select
                        style={{ width: 150, marginLeft: 10 }}
                        onChange={(value) => { changeQuizType(value) }}
                        defaultValue={newQuizType}
                    >

                        <Option value="Identification">Identification</Option>
                        <Option value="Multiple Choice">Multiple Choice</Option>
                        <Option value="Checkbox">Checkbox</Option>
                    </Select>


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
