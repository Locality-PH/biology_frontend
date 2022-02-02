import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Form,
  Input,
  Button,
  Card,
  message,
  Checkbox,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const EditClassroom = ({match}) => {
  const classCode = match.params.class_code
  const teacherId = localStorage.getItem("tid");

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false);

  const [classData, setClassData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const [modules, setModules] = useState([]);
  const [isModulesLoading, setIsModulesLoading] = useState(true)

  const [myModulesList, setMyModulesList] = useState([]);
  const [isMyModuleLoading, setIsMyModuleLoading] = useState(true);

  const [presetModulesList, setPresetModulesList] = useState([]);
  const [isPresetModuleLoading, setIsPresetModuleLoading] = useState(true);

  useEffect(() => {
    getMyModules();
    getPresetModules();
    getClassroomData()
  }, []);

  const getMyModules = () => {
    axios
      .get("/api/teacher/get-my-modules/" + teacherId + "/" + classCode)
      .then((response) => {
        setMyModulesList(response.data);
        setIsMyModuleLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const getPresetModules = () => {
    axios
      .get("/api/teacher/get-preset-modules/" + classCode)
      .then((response) => {
        setPresetModulesList(response.data);
        setIsPresetModuleLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const getClassroomData = () => {
    axios
      .get("/api/teacher/get-classroom-data/" + classCode)
      .then((response) => {
        setClassData(response.data)
        setIsLoading(false)

        setModules(response.data.modules)
        setIsModulesLoading(false)
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const checkboxMyModule = (e, moduleId, moduleName, topic, lessonCount) => {
    if (e.target.checked == true) {
      setModules([...modules, { _id: moduleId, type: "MyModule", module_name: moduleName, topic, lesson_count: lessonCount}]);
    } else if (e.target.checked == false) {
      setModules(
        modules.filter((myModules) => myModules._id !== moduleId)
        )
    }

  };

  const checkboxPresetModule = (e, moduleId, moduleName, topic, lessonCount) => {
    if (e.target.checked == true) {
      setModules([...modules, { _id: moduleId, type: "PresetModule", module_name: moduleName, topic, lesson_count: lessonCount}]);
    } else if (e.target.checked == false) {
      setModules(
        modules.filter((presetModules) => presetModules._id !== moduleId)
        )
    }
  };

  const myModuleTableColumns = [
    {
      title: "Module Name",
      dataIndex: "module_name",
      render: (_, result) => (
        <span>
          <Checkbox defaultChecked={result.checked} 
          onChange={(e) => checkboxMyModule(e, result._id, result.module_name, result.topic, result.lesson_count)}>
            {result.module_name}
          </Checkbox>
        </span>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      render: (_, result) => <span>{result.topic}</span>,
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      render: (_, result) => <span>{result.lesson_count}</span>,
    },
  ];

  const presetModuleTableColumns = [
    {
      title: "Module Name",
      dataIndex: "module_name",
      render: (_, result) => (
        <span>
          <Checkbox defaultChecked={result.checked}
          onChange={(e) => checkboxPresetModule(e, result._id, result.module_name, result.topic, result.lesson_count)}>
            {result.module_name}
          </Checkbox>
        </span>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      render: (_, result) => <span>{result.topic}</span>,
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      render: (_, result) => <span>{result.lesson_count}</span>,
    },
  ];

  const addedModuleTableColumns = [
    {
      title: "Module Name",
      dataIndex: "module_name",
      render: (_, result) => (
        <span>
            {result.module_name}
        </span>
      ),
    },
    {
      title: "Topic",
      dataIndex: "topic",
      render: (_, result) => <span>{result.topic}</span>,
    },
    {
      title: "Lesson Count",
      dataIndex: "lesson_count",
      render: (_, result) => <span>{result.lesson_count}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, result) => <span>{result.type}</span>,
    }
  ];

  const updateClassroom = (data) => {
    axios
      .post("/api/teacher/update-classroom", data)
      .then((response) => {
        message.destroy()
        if(response.data == "Updated"){
          message.destroy()
          message.success("Successfully Updated")
        }else{
          return message.error("Error, please try again.")
        }
      })
      .catch((error) => {
        console.log(error);
        message.destroy();
        message.error("The action can't be completed, please try again.");
      });
  };

  const onFinish = (values) => {
    message.loading("Updating ...", 0)
    setIsDisable(true)

    const tempModules = []
    var isEditable = true

    modules.map(result => {
      tempModules.push(result._id)
    })

    if(JSON.stringify(classData.all_module_ids) == JSON.stringify(tempModules)){
      isEditable = false
    }

    values.modules = modules;
    values.modules_is_editable = isEditable
    values.class_code = classCode

    console.log(values);

    updateClassroom(values)
  };

  const initialValues = {
    name: classData.name,
    section_name: classData.section_name,
    description: classData.description
}

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card
            loading={isLoading}
            title="Edit Classroom"
            extra={
              <>
                <Link to="/admin/classroom">
                  <Button
                    type="primary"
                    style={{ backgroundColor: "green", borderColor: "green" }}
                  >
                    Back
                  </Button>
                </Link>
              </>
            }
          >
            <Form name="complex-form" onFinish={onFinish} form={form} initialValues={initialValues}>
              <Form.Item>
                <h4>Classroom Name</h4>
                <Form.Item
                  name="name"
                  noStyle
                  rules={[{ required: true, message: "Name is required" }]}
                >
                  <Input placeholder="Enter Classroom Name" />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <h4>Section Name</h4>
                <Form.Item
                  name="section_name"
                  noStyle
                  rules={[
                    { required: true, message: "Section name is required" },
                  ]}
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

              <Row>
                <Col md="12">
                  <Card title="My Modules">
                    <Table
                      pagination={true}
                      columns={myModuleTableColumns}
                      dataSource={myModulesList}
                      rowKey="_id"
                      loading={isMyModuleLoading}
                      scroll={{ x: "max-content" }}
                    />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <Card title="Preset Modules">
                    <Table
                      pagination={true}
                      columns={presetModuleTableColumns}
                      dataSource={presetModulesList}
                      rowKey="_id"
                      loading={isPresetModuleLoading}
                      scroll={{ x: "max-content" }}
                    />
                  </Card>
                </Col>
              </Row>

              <br></br>

              <Row>
                <Col md="12">
                  <Card title="Added Modules">
                    <Table
                      pagination={true}
                      columns={addedModuleTableColumns}
                      dataSource={modules}
                      rowKey="_id"
                      loading={isModulesLoading}
                      scroll={{ x: "max-content" }}
                    />
                  </Card>
                </Col>
              </Row>

              <br></br>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="mr-2"
                  style={{ backgroundColor: "green", borderColor: "green" }}
                  disabled={isDisable}
                >
                  Update
                </Button>
                {/* <Button htmlType="button" onClick={() => resetForm()}>
                  Reset
                </Button> */}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditClassroom;
