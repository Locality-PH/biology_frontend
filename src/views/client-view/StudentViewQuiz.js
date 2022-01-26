import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, Spin, Modal, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import Axios from 'axios'

//css
import "assets/css/app-views/Quiz/ViewQuiz.css"

const StudentViewQuiz = (props) => {
    let history = useHistory();
    const quiz_code = props.match.params.quiz_code
    const class_code = props.match.params.class_code
    const sid = localStorage.getItem("sid");

    const [form] = Form.useForm();
    const formRef = React.createRef();

    const [quiz, setQuiz] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)
    const [scoreModal, setScoreModal] = useState(false);
    const [scoreboard, setScoreboard] = useState({});
    let isScoreboardEmpty = Object.keys(scoreboard).length <= 0

    useEffect(() => {
        (async () => {
            await Axios.post("/api/quiz/student/get/code/" + quiz_code, { sid, class_code }).then((response) => {
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

            await Axios.post("/api/scoreboard/validate/student", { sid, qc: quiz_code }).then((response) => {
                const scoreData = response.data

                if (scoreData != null) {
                    setScoreboard(scoreData)
                } else {
                    console.log(response.data)
                }
            });

        })()

    }, [])

    useEffect(() => {
        form.resetFields();
    }, [question, scoreboard])

    console.log("This is quiz array:", quiz)
    console.log("This is scoreboard array:", scoreboard.answer_list)

    const initialVal = scoreboard.answer_list

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

    const onFinish = (values) => {
        // console.log("Values from quiz form:", values)

        const quiz_length = Object.keys(values).length
        let score_list = []
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

            score_list.push(am)

            if (am == true) {
                score++;
            }

        }

        console.log(score_list)
        console.log(score)

        const tempValues = {
            student_id: sid,
            score_list,
            answer_list: values,
            quiz_id: quiz.quiz_id,
            max_score: quiz_length,
            score,
        }

        // console.log("Scoreboard:", tempValues)
        setScoreboard(tempValues)
        setScoreModal(true)

        Axios.post("/api/scoreboard/create", { tempValues }).then((response) => {
            console.log(response.data)
        });
    }


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
                                    <Input prefix={<b>Answer:</b>} disabled={!isScoreboardEmpty}/>
                                </Form.Item>
                            </Card>
                        )
                    } else if (question.type == "Multiple Choice") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p>{QTNkey}. {question.string}</p>
                                
                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey + "_answer"}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Radio.Group disabled={!isScoreboardEmpty}>
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
                                    <Checkbox.Group disabled={!isScoreboardEmpty}>
                                        <Space direction="vertical">

                                            {question.option.map(
                                                (option, QTNkey) => {
                                                    return (
                                                        <Checkbox key={QTNkey} value={option.value}>{option.value}</Checkbox>
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

        if (!isScoreboardEmpty) {
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

                <Form
                    name="quiz-form"
                    onFinish={onFinish}
                    ref={formRef}
                    form={form}
                    scrollToFirstError={true}
                    initialValues={initialVal}

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
                                <Button type="primary" htmlType="submit" disabled={!isScoreboardEmpty}>
                                    Submit
                                </Button>

                                <Button type="primary" className='ml-2' onClick={() => setScoreModal(true)}>
                                    View Score
                                </Button>
                            </div>
                        </div>
                    }
                </Form>
            </Spin>

            {PrintScoreModal()}
        </div>
    )
}

export default StudentViewQuiz
