import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, Spin, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import Axios from 'axios'

//css
import "assets/css/app-views/Quiz/ViewQuiz.css"

const ViewQuiz = (props) => {
    let history = useHistory();
    const quiz_code = props.match.params.quiz_code
    const tid = localStorage.getItem("tid");

    const [form] = Form.useForm();
    const formRef = React.createRef();

    const [quiz, setQuiz] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)

    useEffect(() => {

        (async () => {
            await Axios.post("/api/quiz/get/code/" + quiz_code, { tid }).then((response) => {
                const quizData = response.data;

                if (response.data != "failed") {
                    setQuiz(quizData)
                    setQuestion(quizData.question)
    
                    setTimeout(() => {
                        setShowQuestion(false)
                    }, 300);
                } else {
                    message.error("Quiz not found!!")
                    setTimeout(() => {
                        history.goBack()
                    }, 500);
                }
            });

        })()

    }, [])

    useEffect(() => {
        form.resetFields();
    }, [question])

    // console.log("This is question array:", question)
    // console.log("This is question test:", question != null)
    console.log("This is quiz array:", quiz)

    //Initialize default value here
    const tempInitialVal = [
        { quiz_name: quiz.name },
        { quiz_description: quiz.description }
    ]

    //Setting up of initialVal for form
    let initialVal = []
    if (question.length != undefined) {
        question.map((question, i) => {
            tempInitialVal.push({ ["question" + [i + 1]]: question.string })

            if (question.option != undefined) {

                if (typeof question.option == 'string') {
                    tempInitialVal.push({ ["question" + [i + 1] + "_options"]: question.option })
                }

                else {

                    if (typeof question.option == 'object') {
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
            }

        })

        initialVal = tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {})

        console.log("Initial values: ", initialVal)

        form.resetFields();
    }

    //Functions

    const onTempFinish = (values) => {
        console.log("Values from quiz form:", values)
    }
    const onFinish = (values) => {
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


        (async () => {
            console.log(newQuiz)
            await Axios.post("/api/quiz/create-quiz", { newQuiz }).then((response) => {
                console.log(response.data)
            });

        })()
    };

    const PrintQuestion = () => {
        if (question.length != undefined) {
            return (
                question.map((question, key) => {
                    key += 1
                    let QTNkey = key;

                    if (question.type == "Identification") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

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

    }

    return (
        <div className='view-quiz'>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Form
                    name="quiz-form"
                    onFinish={onTempFinish}
                    initialValues={initialVal}
                    ref={formRef}
                    form={form}
                    scrollToFirstError={true}
                >
                    {showQuestion != true &&
                        <div>
                            <Card className='card-box-shadow-style question-card center-div'>
                                <p className='quiz-name' >
                                    {quiz.name}
                                </p>
                                <p className='m-0'>
                                    {quiz.description}
                                </p>
                            </Card>

                            {PrintQuestion()}

                            <div className='center-div mb-4'>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }
                </Form>
            </Spin>
        </div>
    )
}

export default ViewQuiz
