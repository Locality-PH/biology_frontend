import React, { useState, useEffect, useRef } from 'react'
import { Card, Row, Col, Form, Input, InputNumber, Space, Button, Checkbox, Radio, Select, Spin, Upload, Divider, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined, StarOutlined } from '@ant-design/icons';
import { AiOutlinePlus } from "react-icons/ai"
import { useHistory } from "react-router-dom";
import "assets/css/app-views/Classwork/CreateClasswork.css"
import Axios from 'axios';

const { Option } = Select;

const EditClasswork = (props) => {
    let history = useHistory();
    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [newClassworkType, SetNewClassworkType] = useState("Identification")
    const [newFile, SetNewFile] = useState({})
    const tid = localStorage.getItem("tid");

    const [classwork, setClasswork] = useState({})
    const [question, setQuestion] = useState({})
    const [isQuestionLoading, setIsQuestionLoading] = useState(true)
    const [initialVal, setInitialVal] = useState({})

    const classwork_code = props.match.params.classwork_code

    useEffect(() => {

        setTimeout(() => {
            setIsQuestionLoading(false)
        }, 300);

    }, [])

    useEffect(() => {
        form.resetFields()
    }, [initialVal]);

    // useEffect(() => {
    //     if (Object.keys(newFile).length > 0) {
    //         // console.log("newFile:", newFile)
    //     }
    // }, [newFile]);

    useEffect(() => {
        if (question.length != undefined) {
            let tempInitialVal = [
                { classwork_name: classwork.name },
                { classwork_description: classwork.description }
            ]

            let tempNewFile = {}

            question.map((question, i) => {
                tempInitialVal.push({ ["question" + [i + 1]]: question.string })

                if (question.option != undefined) {

                    if (question.type == 'Identification') {
                        tempInitialVal.push({ ["question" + [i + 1] + "_options"]: question.option })
                        tempInitialVal.push({ ["question" + [i + 1] + "_score"]: question.score })
                    }

                    else {

                        if (question.type == 'Multiple Choice' || question.type == 'Checkbox') {
                            let optionArray = []

                            question.option.map(
                                (option) => {
                                    if (option != null) {
                                        optionArray.push(option)
                                    }
                                })

                            tempInitialVal.push({ ["question" + [i + 1] + "_options"]: optionArray })
                            tempInitialVal.push({ ["question" + [i + 1] + "_score"]: question.score })
                        }

                    }
                }

                if (question.img != undefined) {
                    tempNewFile[`question${i + 1}_image`] = { file: question.img.file, filename: question.img.filename, index: i + 1, isNewFile: true }

                    if (question._id != null) {
                        tempNewFile[`question${i + 1}_image`] = { ...tempNewFile[`question${i + 1}_image`], isNewFile: false, id: question._id }
                    }
                }

                if (question.type == 'Essay') {
                    tempInitialVal.push({ ["question" + [i + 1] + "_score"]: question.score })
                }

            })

            tempInitialVal = (tempInitialVal.reduce(((r, c) => Object.assign(r, c)), {}))
            setInitialVal(() => tempInitialVal)
            SetNewFile({ ...tempNewFile })
        }

    }, [question]);


    const setIsAnswer = (key, QTNkey) => {
        let temp_options = formRef.current.getFieldValue("question" + QTNkey + "_options");

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
        var ql

        if (question.length != null) {
            ql = question.length
        } else (ql = 0)

        setIsQuestionLoading(true)

        let classwork_type = newClassworkType

        let newQuestion = {}

        if (classwork_type == "Multiple Choice") {
            newQuestion = {
                string: "",
                type: classwork_type,
                answer: [null],
                option: [{ isAnswer: false }, { isAnswer: false }, { isAnswer: false }, { isAnswer: false }]
            }
        }

        else {
            newQuestion = {
                string: "",
                type: classwork_type,
                answer: [null],
                option: [null]
            }
        }

        // form.getFieldsValue(true)
        let currentFormData = formRef.current.getFieldsValue("true")
        currentFormData = updateForm(currentFormData)
        currentFormData = updateNewFile(currentFormData)
        newQuestion = currentFormData.question.concat(newQuestion)

        setClasswork({ ...classwork, name: currentFormData.name, description: currentFormData.description })
        setQuestion(newQuestion)

        setTimeout(() => {
            setIsQuestionLoading(false)
            form.scrollToField("question" + ql, scrollConfig)
            message.success(`question ${ql + 1} has been added.`)
        }, 300);
    }

    const removeQuestion = (QTNkey) => {
        setIsQuestionLoading(true)
        var ql = question.length

        let currentFormData = formRef.current.getFieldsValue("true")
        currentFormData = updateForm(currentFormData)
        currentFormData = updateNewFile(currentFormData)

        // splice (remove this index, how many to remove)
        currentFormData.question.splice(QTNkey - 1, 1)

        setClasswork({ ...classwork, name: currentFormData.name, description: currentFormData.description })
        setQuestion(currentFormData.question)

        setTimeout(() => {
            setIsQuestionLoading(false)

            form.scrollToField(`question${QTNkey - 1}`, scrollConfig)
            message.success(`Previous question ${QTNkey} has been removed.`)
        }, 300);

    }

    const updateForm = (values) => {
        let classwork_length = question.length
        let newClasswork = {}

        newClasswork["name"] = values["classwork_name"]
        newClasswork["description"] = values["classwork_description"]
        newClasswork["question"] = []

        for (let i = 1; i < classwork_length + 1; i++) {
            let newQuestion = {}
            let newOptions = values["question" + i + "_options"]

            newQuestion["option"] = newOptions
            newQuestion["type"] = values["question" + i + "_type"]
            newQuestion["string"] = values["question" + i]
            newQuestion["answer"] = []

            if (values["question" + i + "_id"] != null) {
                if (newQuestion.type == "Identification" || newQuestion.type == "Multiple Choice" || newQuestion.type == "Checkbox" || newQuestion.type == "Instruction") {
                    newQuestion["_id"] = values["question" + i + "_id"]
                }

                else if (newQuestion.type == "Image") {

                    if (newFile[`question${i}_image`].isNewFile == false) {
                        newQuestion["_id"] = values["question" + i + "_id"]
                    }

                }
            }

            if (newOptions != undefined) {
                if (newQuestion.type == "Identification") {
                    newQuestion["answer"] = [newOptions]
                    newQuestion["score"] = values["question" + i + "_score"]
                }

                else if (newQuestion.type == "Multiple Choice" || newQuestion.type == "Checkbox") {
                    for (let x = 0; x < newOptions.length; x++) {
                        if (newOptions[x] != undefined) {
                            if (newOptions[x].isAnswer == true) {
                                newQuestion["answer"].push(newOptions[x].value)
                            }
                        }

                        newQuestion["score"] = values["question" + i + "_score"]

                    }
                }

            }

            if (newQuestion.type == "Essay") {
                newQuestion["score"] = values["question" + i + "_score"]
            }

            newClasswork["question"].push(newQuestion)

        }

        return newClasswork
    }

    const updateNewFile = (currentFormData) => {
        var newFileKeys = Object.keys(newFile)

        newFileKeys.map((file) => {
            var cf = newFile[file] //Current NewFile
            var question = currentFormData.question[cf.index - 1]
            question.img = { file: cf.file, filename: cf.filename }


        })

        return currentFormData
    }

    const changeClassworkType = (value) => {
        SetNewClassworkType(value)
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
                                    <Input />
                                </Form.Item>

                                {question._id != null &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + key}
                                    colon={false}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Input placeholder='Question here....' className='underline-input' />
                                </Form.Item>


                                <Form.Item
                                    className='mb-0'
                                    name={"question" + key + "_options"}
                                    rules={[{ required: true, message: "Need answer for this question!" }]}
                                    required={false}
                                >
                                    <Input prefix={<b>Answer:</b>} />
                                </Form.Item>

                                <Divider className='m-2' />

                                <Form.Item
                                    name={"question" + key + "_score"}
                                    rules={[{ required: true, message: "Need points!" }]}
                                    required={false}
                                    label={<b className='mt-2'>Points:</b>}
                                    className="m-0"
                                >
                                    <InputNumber
                                        className='underline-input m-0'
                                        min={1}
                                        style={{ width: "60px" }}
                                    />
                                </Form.Item>

                                <p className='m-0 center-div question-text-card'>card {key}</p>
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
                                    <Input />
                                </Form.Item>

                                {question._id != null &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Input placeholder='Question here....' className='underline-input' />
                                </Form.Item>

                                {/* name={"question" + QTNkey + "_options"} */}
                                <Form.List
                                    name={"question" + QTNkey + "_options"}
                                >

                                    {(fields) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (

                                                <Row key={key} gutter={0} wrap={false}>
                                                    <Col>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "isAnswer"]}
                                                            className='mb-2'
                                                            valuePropName="checked"
                                                        >
                                                            <Radio onChange={() =>
                                                                setIsAnswer(key, QTNkey)
                                                            } />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={22} sm={22} md={23} lg={23} xl={23} xxl={23} style={{ width: "100%" }}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "value"]}
                                                            rules={[{ required: true, message: 'Put option here!' }]}
                                                            className='mb-2'
                                                            style={{ width: "100%" }}
                                                        >
                                                            <Input placeholder="Option here" />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>


                                            ))}
                                        </>
                                    )}


                                </Form.List>

                                <Divider className='m-2' />

                                <Form.Item
                                    name={"question" + key + "_score"}
                                    label={<b className='mt-2'>Points:</b>}
                                    rules={[{ required: true, message: "Need points!" }]}
                                    required={false}
                                    className="m-0"
                                >
                                    <InputNumber
                                        className='underline-input m-0'
                                        min={1}
                                        style={{ width: "60px" }}
                                    />
                                </Form.Item>

                                <p className='m-0 center-div question-text-card'>card {key}</p>
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
                                    <Input />
                                </Form.Item>

                                {question._id != null &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }


                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
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

                                                <Row key={key} gutter={10} wrap={false} className="mb-2">

                                                    <Col>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "isAnswer"]}
                                                            className='mb-0'
                                                            valuePropName="checked"
                                                        // initialValue={false}
                                                        >
                                                            <Checkbox />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={20} sm={21} md={22} lg={22} xl={22} xxl={22} style={{ width: "100%" }}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, "value"]}
                                                            rules={[{ required: true, message: 'Need option here!' }]}
                                                            className='mb-0'
                                                        >
                                                            <Input placeholder="Option here" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col>
                                                        <MinusCircleOutlined
                                                            onClick={
                                                                () => {
                                                                    remove(name)
                                                                }} />
                                                    </Col>
                                                </Row>


                                            ))}

                                            <Form.Item className='mb-4'>
                                                <Button type="dashed" block onClick={() => add()} >
                                                    <Space size={4} align='middle'>
                                                        <AiOutlinePlus /> <p>Add Option</p>
                                                    </Space>
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}

                                </Form.List>

                                <Divider className='m-2' />

                                <Form.Item
                                    name={"question" + key + "_score"}
                                    label={<b className='mt-2'>Points:</b>}
                                    rules={[{ required: true, message: "Need points!" }]}
                                    required={false}
                                    className="m-0"
                                >
                                    <InputNumber
                                        className='underline-input m-0'
                                        min={1}
                                        style={{ width: "60px" }}
                                    />
                                </Form.Item>

                                <p className='m-0 center-div question-text-card'>card {key}</p>
                            </Card>
                        )
                    } else if (question.type == "Image") {
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
                                    initialValue={"Image"}
                                    hidden={true}
                                >
                                    <Input />
                                </Form.Item>

                                {(question._id != null) &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
                                    rules={[{ required: true, message: "Question can't be blank!" }]}
                                    required={false}
                                >
                                    <Input placeholder='Question here....' className='underline-input' />
                                </Form.Item>


                                <Form.Item
                                    className='mb-0'
                                    name={"question" + key + "_image"}
                                    valuePropName={"question" + key + "_image"}
                                >
                                    <Upload
                                        {...uploadConfig}
                                        maxCount={1}
                                        className="upload-container"
                                        onChange={(file) => handleFileUpload(file, "question" + key + "_image", key)}
                                        onRemove={() => handleFileRemove("question" + key + "_image", key)}
                                        defaultFileList={() => getFile("question" + key + "_image")}
                                    >
                                        <Button icon={<UploadOutlined />} style={{ width: "100%" }}>Click to Upload</Button>
                                    </Upload>

                                </Form.Item>

                                {getImgFile("question" + key + "_image")}

                                <p className='m-0 center-div question-text-card'>card {key}</p>
                            </Card>
                        )
                    } else if (question.type == "Instruction") {
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
                                    initialValue={"Instruction"}
                                    hidden={true}
                                >
                                    <Input />
                                </Form.Item>

                                {(question._id != null) &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }

                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
                                    rules={[{ required: true, message: "This can't be blank!!" }]}
                                    required={false}
                                >
                                    <Input.TextArea placeholder='Question here....' className='underline-input' style={{ marginBottom: 0 }} autoSize={{ minRows: 1, maxRows: 4 }} />
                                </Form.Item>

                                <p className='m-0 center-div question-text-card'>card {key}</p>
                            </Card>
                        )
                    } else if (question.type == "Essay") {
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
                                    initialValue={"Essay"}
                                    hidden={true}
                                >
                                    <Input />
                                </Form.Item>

                                {(question._id != null) &&
                                    <Form.Item
                                        name={"question" + key + "_id"}
                                        initialValue={question._id}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
                                }

                                <b>Essay:</b>
                                <Form.Item
                                    className='mb-0'
                                    name={"question" + QTNkey}
                                    colon={false}
                                    rules={[{ required: true, message: "This can't be blank!!" }]}
                                    required={false}
                                >
                                    <Input.TextArea placeholder='Question here....' className='underline-input' style={{ marginBottom: 0 }} autoSize={{ minRows: 1, maxRows: 4 }} />
                                </Form.Item>

                                <Divider className='m-2' />

                                <Form.Item
                                    name={"question" + key + "_score"}
                                    rules={[{ required: true, message: "Need points!" }]}
                                    required={false}
                                    label={<b className='mt-2'>Points:</b>}
                                    className="m-0"
                                >
                                    <InputNumber
                                        className='underline-input m-0'
                                        min={1}
                                        style={{ width: "60px" }}
                                    />
                                </Form.Item>

                                <p className='m-0 center-div question-text-card'>card {key}</p>
                            </Card>
                        )
                    }

                })
            )
        }

    }

    const onFinish = async (values) => {
        let classwork_length = question.length
        let newClasswork = {}
        let hasError = false;

        newClasswork["name"] = values["classwork_name"]
        newClasswork["description"] = values["classwork_description"]
        newClasswork["question"] = []

        for (let i = 1; i < classwork_length + 1; i++) {
            let newQuestion = {}
            let newOptions = values["question" + i + "_options"]

            newQuestion["option"] = newOptions
            newQuestion["type"] = values["question" + i + "_type"]
            newQuestion["string"] = values["question" + i]
            newQuestion["answer"] = []

            if (values["question" + i + "_id"] != null) {
                newQuestion["_id"] = values["question" + i + "_id"]
            }

            if (newQuestion.type == "Identification") {
                newQuestion["answer"] = [newOptions]
                newQuestion["score"] = values["question" + i + "_score"]
            }

            else if (newQuestion.type == "Multiple Choice" || newQuestion.type == "Checkbox") {

                for (let x = 0; x < newOptions.length; x++) {
                    if (newOptions[x].isAnswer == true) {
                        newQuestion["answer"].push(newOptions[x].value)
                    }
                }

                newQuestion["score"] = values["question" + i + "_score"]

                if (newQuestion["answer"].length == 0) {
                    message.error("Failed to upload classwork, card " + i + " need answer!!")
                    hasError = true
                }

            }

            else if (newQuestion.type == "Image") {
                if (newFile[`question${i}_image`] == null) {
                    message.error("Failed to upload classwork, card " + i + " has no image!!")
                    hasError = true
                }
            }

            else if (newQuestion.type == "Essay") {
                newQuestion["score"] = values["question" + i + "_score"]
            }

            newClasswork["question"].push(newQuestion)
        }

        if (!hasError) {
            const formData = new FormData()
            var newFileObject = Object.keys(newFile)

            newFileObject.forEach((key, index) => {

                if (newFile[key].isNewFile == true) {
                    formData.append(key, newFile[key].file.file)
                }

                formData.append("question_index", JSON.stringify({ index: newFile[key].index - 1, isNewFile: newFile[key].isNewFile }))

            });

            formData.append("newClasswork", JSON.stringify(newClasswork))
            formData.append("tid", tid)

            try {
                await Axios.post("/api/classwork/create-classwork", formData).then((response) => {
                    // console.log(response.data)
                }).then( () => {
                    message.success("Classwork has been created successfully.", 10)

                    setTimeout(() => {
                        history.push("/admin/classwork")
                    }, 800);
            
                })

            } catch (error) {
                console.log(error)
                message.error('Error!! Please try again later.');
            }
        }

    };

    const uploadConfig = {
        beforeUpload: file => {
            if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
                return Upload.LIST_IGNORE
            }
            return false;
        },
    }

    const handleFileUpload = (file, name, key) => {

        if (file != null && file.file.status != "removed") {
            SetNewFile({ ...newFile, [name]: { file, filename: file.file.name, index: key, isNewFile: true } })
        }
    }

    const handleFileRemove = (name, key) => {
        var tempNewFile = { ...newFile }
        delete tempNewFile[name]
        SetNewFile(tempNewFile)

    }

    const getFile = (name) => {

        var tempFile = newFile[name]

        if (tempFile !== undefined) {
            return ([{ name: tempFile.filename }])
        }
    }

    function getBase64(file) {
        return (URL.createObjectURL(file))
    }

    const getImgFile = (name) => {

        var tempFile = newFile[name]

        if (tempFile !== undefined) {

            if (tempFile.isNewFile == false) {
                return (
                    <img src={`data:image/png;base64,${tempFile.file}`} className='center-div' style={{ width: "80%" }} />
                )
            }

            else if (tempFile.isNewFile == true) {
                return (
                    <img src={getBase64(tempFile.file.file)} className='center-div' style={{ width: "80%" }} />
                )

            }
        }
    }

    const scrollConfig = {
        behavior: 'smooth',
        block: 'start'
    }

    return (
        <div className='classwork-form h-100' >
            <Spin spinning={isQuestionLoading} wrapperClassName={({ "load-icon": isQuestionLoading })}>
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
                            initialValues={initialVal}
                            ref={formRef}
                            form={form}
                            scrollToFirstError={true}
                        >
                            {isQuestionLoading == false &&
                                <div>
                                    <Card className='card-box-shadow-style question-card center-div'>
                                        <Form.Item
                                            className='mb-0'
                                            name="classwork_name"
                                            colon={false}
                                            rules={[{ required: true, message: "Classwork Name can't be blank!" }]}
                                            required={false}
                                        >
                                            <Input placeholder='Classwork Name' className='underline-input classwork-name-input' />
                                        </Form.Item>


                                        <Form.Item
                                            name="classwork_description"
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
                                            onChange={(value) => { changeClassworkType(value) }}
                                            defaultValue={newClassworkType}
                                        >

                                            <Option value="Identification">Identification</Option>
                                            <Option value="Multiple Choice">Multiple Choice</Option>
                                            <Option value="Checkbox">Checkbox</Option>
                                            <Option value="Image">Image</Option>
                                            <Option value="Instruction">Instruction</Option>
                                            <Option value="Essay">Essay</Option>
                                        </Select>


                                    </div>

                                    <div className='center-div mb-4'>
                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            }
                        </Form>
                    </Col>
                </Row>

            </Spin>
        </div >
    )
}

export default EditClasswork

