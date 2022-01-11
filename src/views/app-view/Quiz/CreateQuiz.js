import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import "assets/css/app-views/Quiz/CreateQuiz.css"

const { Option } = Select;

const CreateQuiz = () => {
    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [newQuizType, SetNewQuizType] = useState("Identification")

    const tempQuiz = {
        Qid: 1,
        Name: "Quiz 1",
        Description: "Dis is the description.",
        Question: [
            {
                id: 6,
                String: "This is the test question 1",
                Type: "Identification",
                Answer: [
                    "Test"
                ],
                Option: [null]
            },
            {
                id: 7,
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
                id: 8,
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

    useEffect(() => {
        console.log(question)
        form.resetFields();
    }, [question])

    //Initialize default value here
    const tempInitialVal = [
        { quiz_type: "Identification" }
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

        // console.log("option for question " + [i + 1])
        // console.log(optionArray)

        tempInitialVal.push({ ["question" + [i + 1] + "_options"]: optionArray })
    })

    let initialVal = tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {})
    // initialVal = Object.assign(initialVal, initialValuesOptions)

    // console.log(tempQuiz)
    // console.log(initialVal)

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

    const addQuestion = () => {
        let quiz_type = newQuizType
        var newQid = 1 // this should be object id

       if (question.length > 0) {
        newQid = question[question.length - 1].id + 1
       }

        const newQuestion = {
            id: newQid,
            String: "This is a new test question ",
            Type: quiz_type,
            Answer: [null],
            Option: [null]
        }

        console.log(newQuestion)
        setQuestion(question.concat(newQuestion))
    }

    const removeQuestion = (Qid) => {
        console.log(Qid)

        const newQuestion = question.filter(
            (question) => {
                return (question.id != Qid)
            }
        )

        setQuestion(newQuestion)
    }

    const changeQuizType = (value) => {
        SetNewQuizType(value)
    }

    const PrintQuestion = () => {
        return (
            question.map((question, key) => {
                let Qid = question.id;
                key += 1

                if (question.Type == "Identification") {
                    return (
                        <Card className='card-box-shadow-style question-card center-div' key={key}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(Qid)}
                            />

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
                                // rules={[{ required: true, message: "Need answer for this question!" }]}
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
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(Qid)}
                            />

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
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                                title="Remove question"
                                className='question-close-btn'
                                onClick={() => removeQuestion(Qid)}
                            />


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
        let quiz_length = Object.keys(values).length / 2;
        let newQuiz = {}

        console.log('Received values of form:', values);

        for (let i = 1; i < quiz_length + 1; i++) {
            newQuiz["giann pogi" + i] = values["question" + i]

        }
        console.log(newQuiz)
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
