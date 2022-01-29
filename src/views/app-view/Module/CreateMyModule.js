import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Form, Input, Button, Card, Upload, Space,  message } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import axios from "axios";

const CreateMyModule = () => {
  const teacherId = localStorage.getItem("tid");

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false)

  const createMyModule = (data) => {
    axios.post("/api/module/create-my-module", data).then((response) => {
      message.destroy()
      if(response.data == "Success"){
        return message.success("Successfully Created.")
      }else{
        return message.error("Error, please try again.")
      }

    }).catch(error => {
      console.log(error)
      message.destroy()
      message.error("The action can't be completed, please try again.")
    });

  }

  const onFinish = values => {
    message.loading("Creating " + values.module_name + "...", 0)
    setIsDisable(true)

    const fmData = new FormData()
    const lessonNames = []
    const lessonClassWorkCode = []

    console.log(values.lessons_data)

    fmData.append("file", values.files.file)
    fmData.append("whole_content", values.whole_content.file)

    delete values.files
    delete values.whole_content
    
    if(values.lessons_data != null){
        values.lessons_data.map(result => {
          lessonNames.push(result.lesson_name)
          lessonClassWorkCode.push(result.classwork_code)
          fmData.append("files", result.lesson_files.file)
      })

      delete values.lessons_data
    }
    else if(Array.isArray(values.lessons_data)){
      if(values.lessons_data.length === 0){
        console.log("Empty Arrayy")
      }
    }else{
      console.log("Modules is empty!")
      delete values.lessons_data
    }

    values.teacher_id = teacherId
    values.lesson_names = lessonNames;
    values.lesson_classwork_codes = lessonClassWorkCode;

    console.log(values)

    fmData.append("values", JSON.stringify(values))
    createMyModule(fmData)
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
    classwork_code: ""
  }

return (
    <Container fluid>
    <Row>
      <Col md="12">
        <Card title="Create Module" extra={<>
        <Link to="/admin/module">
          <Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button>
        </Link></>}>
          <Form name="complex-form" onFinish={onFinish} form={form} initialValues={initialValues}>
              <Form.Item>
                  <h4>Module Name</h4>
                  <Form.Item
                      name="module_name"
                      rules={[{ required: true, message: 'Module Name is required' }]}
                      >
                      <Input placeholder="Enter Module Name" />
                  </Form.Item>
              </Form.Item>

              <Form.Item >
                <h4>Introduction</h4>
                <Space style={{ display: 'flex' }} align="baseline">
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Lesson name is required' }]}
                  >
                    <Input placeholder="Enter Lesson Name" />
                  </Form.Item>
                  <Form.Item
                    valuePropName="files"
                    name="files"
                    rules={[{ required: true, message: 'PDF File is required' }]}
                  >
                    <Upload {...props} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                    </Upload>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item>
                  <h4>Downloadable Module</h4>
                  <Form.Item
                    valuePropName="whole_content"
                    name="whole_content"
                    rules={[{ required: true, message: 'Downloadable Module is required' }]}> 
                      <Upload {...props} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                      </Upload>
                  </Form.Item> 
              </Form.Item>

              <Form.Item>
                  <h4>Classwork Code</h4>
                  <Form.Item
                      name="classwork_code"
                      noStyle
                      >
                      <Input placeholder="Enter Classwork Code" />
                  </Form.Item>
              </Form.Item>

              <Form.List name="lessons_data">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'lesson_name']}
                          fieldKey={[fieldKey, 'lesson_name']}
                          rules={[{ required: true, message: 'Lesson name is required' }]}
                        >
                          <Input placeholder="Enter Lesson Name" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          valuePropName={[name, 'lesson_files']}
                          name={[name, 'lesson_files']}
                          fieldKey={[fieldKey, 'lesson_files']}
                          rules={[{ required: true, message: 'PDF File is required' }]}
                        >
                          <Upload {...props} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          initialValue=""
                          name={[name, 'classwork_code']}
                          fieldKey={[fieldKey, 'classwork_code']}
                        >
                          <Input placeholder="Classwork Code" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        New Lesson
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

export default CreateMyModule;