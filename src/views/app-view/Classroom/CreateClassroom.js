import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Form, Input, Select, Button, Card, Upload, Space} from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
const { Option } = Select;

const CreateClassroom = () => {
  const userId = localStorage.getItem("mid");

  const [form] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false)

  const createClassroom = (data) => {
    axios.post("http://localhost:5000/teacher/create-classroom", data).then((response) => {
      setCreateLoading(false)
      console.log(response.data)
    });

  }

  const onFinish = values => {
    setCreateLoading(true)
    values["user_id"] = userId;
    console.log(values)
    createClassroom(values)
  };

  const props = {
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }
  };

return (
    <Container fluid>
    <Row>
      <Col md="12">
      <Card title="Create Classroom">
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

            {/* <Form.Item>
                <h4>Description</h4>
                <Form.Item
                name="description"
                    noStyle
                    rules={[{ required: true }]}
                    >
                    <Input.TextArea placeholder="Write Description" />
                </Form.Item> 
            </Form.Item> */}

            <Form.Item>
                <h4>Modules</h4>
                <Form.Item 
                    name="test_name"
                    fileList="test_name"
                    noStyle
                    rules={[{ required: true, message: 'Section name is required' }]}>
                <Upload {...props}>
                    <Button>
                    <UploadOutlined /> Upload
                    </Button>
                </Upload>
                </Form.Item> 
            </Form.Item>

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
                        name={[name, 'last']}
                        fieldKey={[fieldKey, 'last']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input placeholder="Last Name" />
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
                <Button type="primary" htmlType="submit" className="mr-2" style={{backgroundColor: "green", borderColor: "green"}} loading={createLoading}>Create</Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>Reset</Button>
            </Form.Item>
        </Form>
        </Card>
      </Col>
    </Row>
  </Container>
)
}

export default CreateClassroom;