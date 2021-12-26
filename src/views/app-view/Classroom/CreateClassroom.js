import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Form, Input, Button, Card, Upload, Space,  message, Modal} from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from "axios";

const CreateClassroom = () => {
  const userId = localStorage.getItem("mid");

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [classCode, setClassCode] = useState("")

  const createClassroom = (data) => {
    axios.post("http://localhost:5000/teacher/create-classroom", data).then((response) => {
      message.destroy()
      setModalVisible(true)
      setClassCode(response.data)
      console.log(response.data)
    });

  }

  const onFinish = values => {
    message.loading("Creating " + values.name + "...", 0)
    setIsDisable(true)

    const fmData = new FormData()
    const moduleNames = []
    const quizLinks = []

    if(values["modules_data"] != null){
        values["modules_data"].map(result => {
        moduleNames.push(result.module_name)
        quizLinks.push(result.quiz_link)
        fmData.append("file", result.module.file)
      })

      delete values["modules_data"]
    }

    values["user_id"] = userId;
    values["modules_name"] = moduleNames;
    values["quizs_link"] = quizLinks;

    console.log(values)

    fmData.append("values", JSON.stringify(values))
    createClassroom(fmData)
  };

  const resetForm = () => {
    // form.resetFields()
    setIsDisable(false)
    message.destroy()
  }

  const closeModal = () =>{
    setModalVisible(false)
  }

  const copyClasscode = () =>{
    console.log("Copy Code")
    setModalVisible(false)
  }

  const props = {
    action:"http://localhost:5000/teacher/create-classroom",
    beforeUpload: file => {
      if (file.type !== 'application/pdf') {
        message.error(`${file.name} is not a pdf file`);
        return Upload.LIST_IGNORE
      }
      return false;
    }
  };

return (
    <Container fluid>
    <Row>
      <Col md="12">
      <Modal title="Class Code" visible={modalVisible} onCancel={closeModal}
      footer={
        [<Button key={1} type="primary" style={{backgroundColor: "green", borderColor: "green"}} onClick={() => copyClasscode()}>Copy</Button>]
      }>
        <h3>{classCode}</h3>
      </Modal>

      <Card title="Create Classroom" extra={<><Link to="/admin/classroom"><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
        <Form name="complex-form" onFinish={onFinish} form={form}>
            <Form.Item>
                <h4>Classroom Name</h4>
                <Form.Item
                    name="name"
                    noStyle
                    rules={[{ required: true, message: 'Name is required' }]}
                    >
                    <Input placeholder="Enter Classroom Name" />
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <h4>Section Name</h4>
                <Form.Item
                    name="section_name"
                    noStyle
                    rules={[{ required: true, message: 'Section name is required' }]}
                    >
                    <Input placeholder="Enter Section Name" />
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <h4>Description</h4>
                <Form.Item
                name="description"
                    noStyle
                    rules={[{ required: true }]}
                    >
                    <Input.TextArea placeholder="Enter Class Description" />
                </Form.Item> 
            </Form.Item>

            {/* <Form.Item>
                <h4>Test Modules</h4>
                <Form.Item> 
                    <Upload {...props} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                    </Upload>
                </Form.Item> 
            </Form.Item> */}

            <Form.List name="modules_data">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'module_name']}
                        fieldKey={[fieldKey, 'module_name']}
                        rules={[{ required: true, message: 'Module name is required' }]}
                      >
                        <Input placeholder="Enter Module Name" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        valuePropName={[name, 'module']}
                        name={[name, 'module']}
                        fieldKey={[fieldKey, 'module']}
                        rules={[{ required: true, message: 'Module is required' }]}
                      >
                        <Upload {...props} maxCount={1}>
                          <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                        </Upload>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'quiz_link']}
                        fieldKey={[fieldKey, 'quiz_link']}
                        rules={[{ required: true, message: 'Quiz Link is required' }]}
                      >
                        <Input placeholder="Quiz Link" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Module
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="mr-2" style={{backgroundColor: "green", borderColor: "green"}} disabled={isDisable}>Create</Button>
                <Button htmlType="button" onClick={() => resetForm()}>Reset</Button>
            </Form.Item>
        </Form>
        </Card>
      </Col>
    </Row>
  </Container>
)
}

export default CreateClassroom;