import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Form, Input, Select, Button, Card, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

const CreateClassroom = () => {
  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    }
  };

const onFinish = values => {
    console.log('Received values of form: ', values);
  };

return (
    <Container fluid>
    <Row>
      <Col md="12">
      <Card title="Create Classroom">
        <Form name="complex-form" onFinish={onFinish}>
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
                    name="name"
                    noStyle
                    rules={[{ required: true, message: 'Name is required' }]}
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
                <Form.Item >
                <Upload {...props}>
                    <Button>
                    <UploadOutlined /> Upload
                    </Button>
                </Upload>
                </Form.Item> 
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Add</Button>
            </Form.Item>
        </Form>
        </Card>
      </Col>
    </Row>
  </Container>
)
}

export default CreateClassroom;