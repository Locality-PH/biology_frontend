import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, Spin, Modal, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import Axios from 'axios'

//css
import "assets/css/app-views/Classwork/ViewClasswork.css"

const StudentViewClasswork = (props) => {
    let history = useHistory();
    const classwork_code = props.match.params.classwork_code
    const class_code = props.match.params.class_code
    const mid = props.match.params.module_id
    const sid = localStorage.getItem("sid");

    const [form] = Form.useForm();
    const formRef = React.createRef();

    const [classwork, setClasswork] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)
    const [scoreModal, setScoreModal] = useState(false);
    const [scoreboard, setScoreboard] = useState({});
    let isScoreboardEmpty = Object.keys(scoreboard).length <= 0

    useEffect(() => {
        (async () => {
            await Axios.post("/api/classwork/student/get/code/" + classwork_code, { sid, class_code, mid }).then((response) => {
                const classworkData = response.data;

                console.log(classworkData)

                if (response.data != "failed") {
                    setClasswork(classworkData)
                    setQuestion(classworkData.question)

                    setTimeout(() => {
                        setShowQuestion(false)
                    }, 300);


                } else {
                    message.error("Classwork not found!!")
                    setTimeout(() => {
                        window.location.assign("/client/home")
                    }, 500);
                }
            });

            await Axios.post("/api/scoreboard/validate/student", { sid, qc: classwork_code }).then((response) => {
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

    console.log("This is classwork array:", classwork)
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
        // console.log("Values from classwork form:", values)

        const classwork_length = Object.keys(values).length
        let score_list = []
        let score = 0

        for (let i = 1; i < classwork_length + 1; i++) {
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
            classwork_id: classwork.classwork_id,
            max_score: classwork_length,
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
                                    <Input prefix={<b>Answer:</b>} disabled={!isScoreboardEmpty} />
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
                <Modal title={classwork.name} visible={scoreModal} onOk={handleOk} onCancel={handleCancel}>
                    <h2>Your Score: {scoreboard.score} / {scoreboard.max_score}</h2>
                </Modal>
            )
        }
    }

    return (
        <div className='view-classwork' style={{marginTop: 50}}>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Row justify='center'>
                    <Col xxl={12} xl={16} lg={16} md={18} sm={24} xs={24}>
                        <Form
                            name="classwork-form"
                            onFinish={onFinish}
                            ref={formRef}
                            form={form}
                            scrollToFirstError={true}
                            initialValues={initialVal}

                        >
                            {showQuestion != true &&
                                <div>
                                    <Card className='card-box-shadow-style question-card center-div'>
                                        <p className='classwork-name' >
                                            {classwork.name}
                                        </p>
                                        <p className='m-0'>
                                            {classwork.description}
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
                    </Col>
                </Row>


            </Spin>

            {PrintScoreModal()}
        </div>
    )
}

export default StudentViewClasswork
