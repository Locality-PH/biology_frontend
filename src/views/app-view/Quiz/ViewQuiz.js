import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, Spin, Modal, message } from 'antd'
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
    const [scoreModal, setScoreModal] = useState(false);
    const [scoreboard, setScoreboard] = useState({});

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

        // form.resetFields();
    }

    //Functions
    const compareArray = (arr1, arr2) => {
        console.log(arr1)
        console.log(arr2)

        if (arr1.length == arr2.length) {
            for (let i = 0; i <= arr1.length; i++) {
                if (arr1[i] != arr2[i]) {
                    //array doesn't match
                    return false
                }
            }

            // if both array match
            return true

        } else {
            //array doesn't match
            return false
        }

    }

    const onTempFinish = (values) => {
        console.log("Values from quiz form:", values)

        const quiz_length = Object.keys(values).length
        let answer_list = []
        let score = 0

        for (let i = 1; i < quiz_length + 1; i++) {
            const sa = values["question" + i + "_answer"] //student_answer
            const qa = question[i - 1].answer // question_answer
            const qt = question[i - 1].type //question_type
            let am; //answer_match

            if (qt == "Checkbox") {
                console.log(compareArray(sa, qa))
                am = compareArray(sa, qa)

            } else {
                console.log(sa)
                console.log(qa)
                console.log(sa == qa)

                am = (sa == qa)
            }

            answer_list.push(am)

            if (am == true) {
                score++;
            }

        }

        console.log(answer_list)
        console.log(score)

        const tempValues = {
            student_id: "61ee4308545ddd8a3f4cd7fc",
            quiz_id: quiz.quiz_id,
            max_score: quiz_length,
            score,
        }

        console.log("Scoreboard:", tempValues)
        setScoreboard(tempValues)
        setScoreModal(true)

        // Axios.post("/api/scoreboard/create", {tempValues}).then((response) => {
        //             console.log(response.data)
        // });
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

        console.log("Quiz done:", newQuiz)
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

                                <p>{QTNkey}. {question.string}</p>

                                <Form.Item
                                    name={"question" + QTNkey + "_answer"}
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

                                <p>{QTNkey}. {question.string}</p>
                                {console.log(question.option)}

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey + "_answer"}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Radio.Group >
                                        <Space direction="vertical">

                                            {question.option.map(
                                                (option, QTNkey) => {
                                                    return (
                                                        <Radio key={QTNkey} value={option.value}><p className='m-0'>{option.value}</p></Radio>
                                                    )
                                                }
                                            )}
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>


                            </Card>
                        )
                    } else if (question.type == "Checkbox") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p>{QTNkey}. {question.string}</p>

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey + "_answer"}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Checkbox.Group >
                                        <Space direction="vertical">

                                            {question.option.map(
                                                (option, QTNkey) => {
                                                    return (
                                                        <Checkbox key={QTNkey} value={option.value}><p className='m-0'>{option.value}</p></Checkbox>
                                                    )
                                                }
                                            )}
                                        </Space>
                                    </Checkbox.Group>
                                </Form.Item>

                            </Card>
                        )
                    }

                })
            )
        }

    }

    const PrintScoreModal = () => {
        const handleOk = () => {
            setScoreModal(false);
        };

        const handleCancel = () => {
            setScoreModal(false);
        };

        if (Object.keys(scoreboard).length > 0) {
            return (
                <Modal title={quiz.name} visible={scoreModal} onOk={handleOk} onCancel={handleCancel}>
                    <h2>Your Score: {scoreboard.score} / {scoreboard.max_score}</h2>
                </Modal>
            )
        }
    }

    return (
        <div className='view-quiz'>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Row justify='center'>
                    <Col xxl={12} xl={16} lg={16} md={18} sm={24} xs={24}>
                        <Form
                            name="quiz-form"
                            onFinish={onTempFinish}
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
                    </Col>
                </Row>


            </Spin>

            {PrintScoreModal()}
        </div>
    )
}

export default ViewQuiz
