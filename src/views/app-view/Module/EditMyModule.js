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

const EditMyModule = ({match}) => {
  const moduleId = match.params.module_id

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false)

  const [initialModule, setInitialModule] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/module/get-initial-module/" + moduleId).then((response) => {
        setInitialModule(response.data)
        setIsLoading(false);
      }).catch(() => {
        message.error("Could not fetch the data in the server!")
      });
}
, []);

  const updateMyModule = (data) => {
    axios.post("/api/module/update-my-module", data).then((response) => {
      message.destroy()
      if(response.data == "Updated"){
        message.destroy()
        message.success("Successfully Updated")
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
    message.loading("Updating...", 0)
    setIsDisable(true)

    const fmData = new FormData()
    const lessonNames = []
    const lessonClassWorkCode = []

    const onSendInitialLessonIds = []

    const nfcInitialLessonsId = []
    const nfcInitialLessonsName = []
    const nfcInitialLessonsClassworkCode = []

    const ncInitialLessonsId = []
    const ncInitialLessonsName = []
    const ncInitialLessonsClassworkCode = []

    values.lessons_data.map(result => {
      onSendInitialLessonIds.push(result._id)
    })

    values.lessons_data.map(result => {
      if(result.hasOwnProperty("lesson_files")){
        nfcInitialLessonsId.push(result._id)
        nfcInitialLessonsName.push(result.lesson_name)
        nfcInitialLessonsClassworkCode.push(result.classwork_code)
        fmData.append("update_lesson_file", result.lesson_files.file)
      }else{
        ncInitialLessonsId.push(result._id)
        ncInitialLessonsName.push(result.lesson_name)
        ncInitialLessonsClassworkCode.push(result.classwork_code)

      }

    })

    console.log(nfcInitialLessonsName)
    console.log(ncInitialLessonsName)

    delete values.lessons_data

    const difference = initialModule.initial_lesson_ids
    .filter(result => !onSendInitialLessonIds.includes(result))
    .concat(onSendInitialLessonIds.filter(result => !initialModule.initial_lesson_ids.includes(result)))

    if(values.files != null){
      fmData.append("file", values.files.file)
    }

    if(values.whole_content != null){
      fmData.append("whole_content", values.whole_content.file)
    }

    delete values.files
    delete values.whole_content

    if(values.new_lessons != null){
        values.new_lessons.map(result => {
          lessonNames.push(result.lesson_name)
          lessonClassWorkCode.push(result.classwork_code)
          fmData.append("files", result.lesson_files.file)
      })

      delete values.new_lessons
    }
    else if(Array.isArray(values.new_lessons)){
      if(values.new_lessons.length === 0){
        console.log("Empty Arrayy")
      }
    }else{
      console.log("Modules is empty!")
      delete values.new_lessons
    }

    values.module_id = moduleId;
    values.lesson_names = lessonNames;
    values.lesson_classwork_codes = lessonClassWorkCode;
    values.delete_lessons = difference

    values.nfcInitialLessonsId = nfcInitialLessonsId
    values.nfcInitialLessonsName = nfcInitialLessonsName
    values.nfcInitialLessonsClassworkCode = nfcInitialLessonsClassworkCode

    values.ncInitialLessonsId = ncInitialLessonsId
    values.ncInitialLessonsName = ncInitialLessonsName
    values.ncInitialLessonsClassworkCode = ncInitialLessonsClassworkCode

    console.log(values)

    fmData.append("values", JSON.stringify(values))
    updateMyModule(fmData)
  };

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
      module_name: initialModule.module_name,
      name: initialModule.name,
      classwork_code: initialModule.classwork_code,
      lessons_data: initialModule.lessons_data
  }

return (
    <Container fluid>
    <Row>
      <Col md="12">
        <Card title="Edit My Module" loading={isLoading} extra={<>
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
                  >
                    <Upload {...props} maxCount={1} defaultFileList={[{name :initialModule.files}]}>
                      <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                    </Upload>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item>
                  <h4>Downloadable Module</h4>
                  <Form.Item
                    valuePropName="whole_content"
                    name="whole_content">
                      <Upload {...props} maxCount={1} defaultFileList={[{name: initialModule.whole_content}]}>
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
                        >
                          <Upload {...props} maxCount={1} 
                          defaultFileList={[{name: initialModule.lessons_data[key].filename}]}>
                            <Button icon={<UploadOutlined />}>Upload pdf only</Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'classwork_code']}
                          fieldKey={[fieldKey, 'classwork_code']}
                        >
                          <Input placeholder="Classwork Code" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                  </>
                )}
              </Form.List>

              <Form.List name="new_lessons">
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
                          <Upload {...props} maxCount={1} >
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
                  <Button type="primary" htmlType="submit" className="mr-2" style={{backgroundColor: "green", borderColor: "green"}} disabled={isDisable}>Update</Button>
              </Form.Item>
            </Form>
          </Card>
      </Col>
    </Row>
  </Container>
)
}

export default EditMyModule;