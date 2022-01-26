import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Form, Input, Space, Button, Checkbox, Radio, Select, Spin, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import Axios from 'axios';

const { Option } = Select;

const EditQuiz = (props) => {
    let history = useHistory();
    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [newQuizType, SetNewQuizType] = useState("Identification")
    const tid = localStorage.getItem("tid");

    const [quiz, setQuiz] = useState({})
    const [question, setQuestion] = useState({})
    const [showQuestion, setShowQuestion] = useState(true)
    const quiz_code = props.match.params.quiz_code


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
        if (question.length != undefined && showQuestion == true) {
            setTimeout(() => {
                setShowQuestion(false)
            }, 300);
        }

        console.log("Question:", question)
        form.resetFields();
    }, [question])

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
        setShowQuestion(true)

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
        setShowQuestion(true)

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
        if (question.length != undefined) {
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

                if (newQuestion["answer"].length == 0) {
                    return message.error("Failed to upload quiz, question " + i + " need answer!!")
                }   

            }

            newQuiz["question"].push(newQuestion)
        }

        console.log(newQuiz)

        try {
            await Axios.put("/api/quiz/update", { newQuiz, quiz_id: quiz.quiz_id, tid }).then((response) => {
                console.log(response.data)
            }).then(
                message.success("Changes has been saved.")
            )

        } catch (error) {
            console.log(error)
            message.error('Error!! Please try again later.');
        }

    };

    return (
        <div className='quiz-form h-100'>
            <Spin spinning={showQuestion} wrapperClassName={({ "load-icon": showQuestion })}>

                <Form
                    name="quiz-form"
                    onFinish={onFinish}
                    initialValues={initialVal}
                    ref={formRef}
                    form={form}
                    scrollToFirstError={true}
                >
                    {showQuestion != true &&
                        <div>
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
                        </div>
                    }
                </Form>

            </Spin>
        </div>
    )
}

export default EditQuiz
