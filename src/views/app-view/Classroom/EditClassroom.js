import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Form, Input, Button, Card, Upload, Space,  message } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from "axios";

const EditClassroom = ({match}) => {
  const userId = localStorage.getItem("mid");
  const classCode = match.params.class_code

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [isDisable, setIsDisable] = useState(false)

  const [classroomData, setClassroomData] = useState({})
  const [modulesData, setModulesData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/teacher/get-classroom-data/" + classCode).then((response) => {
      setClassroomData(response.data)
      setModulesData(response.data.module)
      setIsLoading(false)
    }).catch(() => {
      message.error("The action can't be completed, please try again.")
    });
  }
  , []);

  const updateClassroom = (data) => {
    axios.post("http://localhost:5000/teacher/update-classroom/" + classCode, data).then((response) => {
      if(response.data == "Updated"){
        message.destroy()
        message.success("Successfully Updated")
      }
    }).catch(error => {
      console.log(error)
      message.destroy()
      message.error("The action can't be completed, please try again.")
    });;
  }

  const onFinish = values => {
    message.loading("Updating " + values.name + "...", 0)
    setIsDisable(true)

    const fmData = new FormData()
    const moduleNames = []
    const quizLinks = []

    console.log(values["modules_data"])
    
    if(values["modules_data"] != null){
        values["modules_data"].map(result => {
          moduleNames.push(result.module_name)
          quizLinks.push(result.quiz_link)
          fmData.append("file", result.module.file)
      })

      delete values["modules_data"]
    }
    else if(Array.isArray(values["modules_data"])){
      if(values["modules_data"].length ===0){
        console.log("Empty Arrayy")
      }
    }else{
      console.log("Modules is empty!")
    }

    values["user_id"] = userId;
    values["modules_name"] = moduleNames;
    values["quizs_link"] = quizLinks;

    fmData.append("values", JSON.stringify(values))
    updateClassroom(fmData)

    console.log(values)
  };

  const resetForm = () => {
    form.resetFields()
    setIsDisable(false)
    message.destroy()
  }

  const props = {
    beforeUpload: file => {
      if (file.type !== 'application/pdf') {
        message.error(`${file.name} is not a pdf file`);
        return Upload.LIST_IGNORE
      }
      return false;
    }
  };

  const initialValues = {
    ["name"]: classroomData.name,
    ["section_name"]: classroomData.section_name,
    ["description"]: classroomData.description,
    ["initial_modules_data"]: modulesData
  }

  console.log(modulesData)

return (
    <Container fluid>
    <Row>
      <Col md="12">
      <Card title="Edit Classroom" loading={isLoading} extra={<><Link to="/admin/classroom"><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
        <Form name="complex-form" onFinish={onFinish} form={form}
        initialValues={initialValues}>
            <Form.Item>
                <h4>Classroom Name</h4>
                <Form.Item
                    name="name"
                    noStyle
                    rules={[{ required: true, message: 'Name is required' }]}
                    >
                    <Input placeholder="Enter Classroom Name"/>
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

            {/* <Form.List name="initial_modules_data">
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
                        <Input placeholder="Enter Module Name"/>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        valuePropName={[name, 'module']}
                        name={[name, 'module']}
                        fieldKey={[fieldKey, 'module']}
                        rules={[{ required: true, message: 'Module is required' }]}
                      >
                        <Upload {...props} maxCount={1} defaultFileList={[{
      name: modulesData[key].module_file.filename
    }]}>
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
                </>
              )}
            </Form.List> */}

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
                <Button type="primary" htmlType="submit" className="mr-2" style={{backgroundColor: "green", borderColor: "green"}} disabled={isDisable}>Save</Button>
                <Button htmlType="button" onClick={() => resetForm()}>Reset</Button>
            </Form.Item>
        </Form>
        </Card>
      </Col>
    </Row>
  </Container>
)
}

export default EditClassroom;