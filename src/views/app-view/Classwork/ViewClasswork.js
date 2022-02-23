import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Space, Button, Checkbox, Radio, Select, Spin, Modal, Divider, message } from 'antd'
import { useHistory } from "react-router-dom";
import Axios from 'axios'

//css
import "assets/css/app-views/Classwork/ViewClasswork.css"

const ViewClasswork = (props) => {
    let history = useHistory();
    const classwork_code = props.match.params.classwork_code
    const tid = localStorage.getItem("tid");

    const [form] = Form.useForm();
    const formRef = React.createRef();

    const [classwork, setClasswork] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)
    const [scoreModal, setScoreModal] = useState(false);
    const [scoreboard, setScoreboard] = useState({});

    useEffect(() => {
        (async () => {
            await Axios.post("/api/classwork/get/code/" + classwork_code, { tid }).then((response) => {
                const classworkData = response.data;

                if (response.data != "failed") {
                    setClasswork(classworkData)
                    setQuestion(classworkData.question)

                    setTimeout(() => {
                        setShowQuestion(false)
                    }, 300);
                } else {
                    message.error("Classwork not found!!")
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

    //Initialize default value here
    const tempInitialVal = [
        { classwork_name: classwork.name },
        { classwork_description: classwork.description }
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
    }

    //Functions
    const compareArray = (arr1, arr2) => {
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

        const classwork_length = Object.keys(question).length
        let temp_cl = classwork_length
        let answer_list = []
        let score = 0

        for (let i = 1; i < classwork_length + 1; i++) {
            const qt = question[i - 1].type //question_type
            if (qt != "Instruction" && qt != "Image") {
                var sa = values["question" + i + "_answer"] //student_answer
                var qa = question[i - 1].answer // question_answer
                let am; //answer_match

                if (qt == "Checkbox") {
                    am = compareArray(sa, qa)
                }
                else if (qt == "Identification") {
                    if (typeof sa != 'string') {
                        sa = sa.toString()
                    }

                    if (typeof qa != 'string') {
                        qa = qa.toString()
                    }

                    sa = sa.replace(/\s/g, '');
                    sa = sa.toLowerCase();
                    qa = qa.replace(/\s/g, '');
                    qa = qa.toLowerCase();

                    am = (sa == qa)
                }
                else {
                    am = (sa == qa)
                }

                answer_list.push(am)

                if (am == true) {
                    score++;
                }
            } else if (qt == "Instruction" || qt == "Image") {
                temp_cl--
            }

        }

        const tempValues = {
            student_id: "61ee4308545ddd8a3f4cd7fc",
            classwork_id: classwork.classwork_id,
            max_score: temp_cl,
            score,
        }

        setScoreboard(tempValues)
        setScoreModal(true)
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

                                <p> {question.string}</p>

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

                                <p> {question.string}</p>

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

                                <p> {question.string}</p>

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
                    } else if (question.type == "Image") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p> {question.string}</p>

                                <img src={`data:image/png;base64,${question.img.file}`} className='center-div' style={{ width: "80%" }} />

                            </Card>
                        )
                    } else if (question.type == "Instruction") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p className='m-0'> {question.string}</p>

                            </Card>
                        )
                    } else if (question.type == "Essay") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <h5><b>Essay:</b></h5>
                                <p> {question.string} </p>
                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
                                    rules={[{ required: true, message: "This can't be blank!!" }]}
                                    required={false}
                                >
                                    <Input.TextArea style={{ marginBottom: 0 }} autoSize={{ minRows: 3, maxRows: 7 }} />
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
                <Modal title={classwork.name} visible={scoreModal} onOk={handleOk} onCancel={handleCancel}>
                    <h2>Your Score: {scoreboard.score} / {scoreboard.max_score}</h2>
                </Modal>
            )
        }
    }

    return (
        <div className='view-classwork'>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Row justify='center'>
                    <Col xxl={12} xl={16} lg={16} md={18} sm={24} xs={24}>
                        <Form
                            name="classwork-form"
                            onFinish={onTempFinish}
                            ref={formRef}
                            form={form}
                            scrollToFirstError={true}
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

export default ViewClasswork
