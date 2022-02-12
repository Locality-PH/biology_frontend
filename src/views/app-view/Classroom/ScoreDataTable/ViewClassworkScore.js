import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Space, Button, Checkbox, Radio, Select, Spin, Modal, Divider, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import Axios from 'axios'

//css
import "assets/css/app-views/Classwork/ViewClasswork.css"

const ViewClassworkScore = (props) => {
    let history = useHistory();
    const classwork_code = props.match.params.classwork_code
    const student_id = props.match.params.student_id
    const mal_id = props.match.params.mal_id
    const tid = localStorage.getItem("tid");

    const [form] = Form.useForm();
    const formRef = React.createRef();

    const [classwork, setClasswork] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)
    const [scoreModal, setScoreModal] = useState(false);
    const [scoreboard, setScoreboard] = useState({});
    const [initialVal, setInitialVal] = useState({});
    let isScoreboardEmpty = Object.keys(scoreboard).length <= 0

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

            await Axios.post("/api/scoreboard/validate/student", { sid: student_id, cc: classwork_code, mal_id }).then((response) => {
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

        if (Object.keys(scoreboard).length > 0) {
            // console.log(question)
            // console.log(scoreboard)

            let tempInitialVal = scoreboard.answer_list
            let score_list = scoreboard.score_list

            // console.log(score_list)

            score_list.forEach(
                (score) => {
                    tempInitialVal[`question${score.index}_score`] = score[`question${score.index}_score`]
                });

            setInitialVal((prev) => tempInitialVal)

        }
    }, [question, scoreboard])

    useEffect(() => {
        // console.log("initialVal", initialVal)
        form.resetFields();
    }, [initialVal])



    //Function

    const onFinish = async (values) => {
        // const classwork_length = Object.keys(question).length
        // console.log("Values from classwork form:", values)

        let score_list = scoreboard.score_list
        let totalScore = 0

        score_list.map(
            (score, key) => {
                let newScore = values[`question${score.index}_score`]
                score_list[key][`question${score.index}_score`] = newScore
                totalScore += newScore
            }
        )

        setScoreboard({...scoreboard, score: totalScore})

        await Axios.post("/api/scoreboard/update_score", { score_list, score: totalScore, scoreboard_id: scoreboard.scoreboard_id }).then((response) => {
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

                                <p>  {question.string}</p>

                                <Form.Item
                                    name={"question" + QTNkey + "_answer"}
                                    rules={[{ required: true, message: "Need answer for this question!" }]}
                                    required={false}
                                >
                                    <Input prefix={<b>Answer:</b>} disabled={!isScoreboardEmpty} />
                                </Form.Item>

                                <Divider className='m-2' />

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name={"question" + key + "_score"}
                                            rules={[{ required: true, message: "Need points!" }]}
                                            required={false}
                                            label={<b className='mt-2'>Points:</b>}
                                            className="m-0"
                                        >
                                            <InputNumber
                                                className='underline-input m-0'
                                                min={0}
                                                max={question.score}
                                                style={{ width: "60px" }}
                                            />
                                        </Form.Item>

                                    </Col>

                                    <Col span={12}>
                                        {question.score == 1 ?
                                            <p className='m-0 pt-2 question-maxpoints'  >{question.score} point</p>
                                            : //esle
                                            <p className='m-0 question-maxpoints'  >{question.score} points</p>
                                        }
                                    </Col>
                                </Row>

                            </Card>
                        )
                    } else if (question.type == "Multiple Choice") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p>  {question.string}</p>

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

                                <Divider className='m-2' />

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name={"question" + key + "_score"}
                                            rules={[{ required: true, message: "Need points!" }]}
                                            required={false}
                                            label={<b className='mt-2'>Points:</b>}
                                            className="m-0"
                                        >
                                            <InputNumber
                                                className='underline-input m-0'
                                                min={0}
                                                max={question.score}
                                                style={{ width: "60px" }}
                                            />
                                        </Form.Item>

                                    </Col>

                                    <Col span={12}>
                                        {question.score == 1 ?
                                            <p className='m-0 pt-2 question-maxpoints'  >{question.score} point</p>
                                            : //esle
                                            <p className='m-0 question-maxpoints'  >{question.score} points</p>
                                        }
                                    </Col>
                                </Row>

                            </Card>
                        )
                    } else if (question.type == "Checkbox") {
                        return (
                            <Card className='card-box-shadow-style question-card center-div' key={QTNkey}>

                                <p>  {question.string}</p>

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

                                <Divider className='m-2' />

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name={"question" + key + "_score"}
                                            rules={[{ required: true, message: "Need points!" }]}
                                            required={false}
                                            label={<b className='mt-2'>Points:</b>}
                                            className="m-0"
                                        >
                                            <InputNumber
                                                className='underline-input m-0'
                                                min={0}
                                                max={question.score}
                                                style={{ width: "60px" }}
                                            />
                                        </Form.Item>

                                    </Col>

                                    <Col span={12}>
                                        {question.score == 1 ?
                                            <p className='m-0 pt-2 question-maxpoints'  >{question.score} point</p>
                                            : //esle
                                            <p className='m-0 question-maxpoints'  >{question.score} points</p>
                                        }
                                    </Col>
                                </Row>

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

                                <Input.TextArea style={{ marginBottom: 0 }} autoSize={{ minRows: 3, maxRows: 7 }} readOnly />

                                <Divider className='m-2' />

                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            name={"question" + key + "_score"}
                                            rules={[{ required: true, message: "Need points!" }]}
                                            required={false}
                                            label={<b className='mt-2'>Points:</b>}
                                            className="m-0"
                                        >
                                            <InputNumber
                                                className='underline-input m-0'
                                                min={0}
                                                max={question.score}
                                                style={{ width: "60px" }}
                                            />
                                        </Form.Item>

                                    </Col>

                                    <Col span={12}>
                                        {question.score == 1 ?
                                            <p className='m-0 pt-2 question-maxpoints'  >{question.score} point</p>
                                            : //esle
                                            <p className='m-0 question-maxpoints'  >{question.score} points</p>
                                        }
                                    </Col>
                                </Row>

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
        <div className='view-classwork' style={{ marginTop: 50 }}>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Row justify='center'>
                    <Col xxl={12} xl={16} lg={16} md={18} sm={24} xs={24}>
                        <Form
                            labelCol={{ flex: '10px' }}
                            labelAlign="left"
                            labelWrap
                            colon={false}
                            wrapperCol={{ flex: 1 }}
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
                                        <Button type="primary" htmlType="submit" >
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

export default ViewClassworkScore

