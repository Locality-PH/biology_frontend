import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  Form,
  Input,
  Button,
  Card,
  Upload,
  Space,
  message,
  Modal,
  Checkbox,
  Table,
} from "antd";
import {
  UploadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import axios from "axios";

const CreateClassroom = () => {
  const teacherId = localStorage.getItem("tid");
  const [teacherName, setTeacherName] = useState("");

  const [form] = Form.useForm();
  const [isDisable, setIsDisable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState("");

  const [modules, setModules] = useState([]);

  const [myModules, setMyModules] = useState([]);
  const [myModulesList, setMyModulesList] = useState([]);
  const [isMyModuleLoading, setIsMyModuleLoading] = useState(true);

  const [presetModules, setPresetModules] = useState([]);
  const [presetModulesList, setPresetModulesList] = useState([]);
  const [isPresetModuleLoading, setIsPresetModuleLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/teacher/get-teacher-fullname/" + teacherId)
      .then((response) => {
        setTeacherName(response.data);
        console.log(response.data);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });

    getMyModules();
    getPresetModules();
  }, []);

  const getMyModules = () => {
    axios
      .get("/api/module/get-my-modules/" + teacherId)
      .then((response) => {
        setMyModules(response.data);
        setMyModulesList(response.data);
        setIsMyModuleLoading(false);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };

  const getPresetModules = () => {
    axios
      .get("/api/module/get-preset-modules")
      .then((response) => {
        setPresetModules(response.data);
        setPresetModulesList(response.data);
        setIsPresetModuleLoading(false);
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
          <Checkbox onChange={(e) => checkboxMyModule(e, result._id, result.module_name, result.topic, result.lesson_count)}>
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
          <Checkbox onChange={(e) => checkboxPresetModule(e, result._id, result.module_name, result.topic, result.lesson_count)}>
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

  const createClassroom = (data) => {
    axios
      .post("/api/teacher/create-classroom", data)
      .then((response) => {
        console.log(response.data);
        axios
          .get("/api/teacher/get-classroom-code/" + response.data)
          .then((response) => {
            message.destroy();
            setModalVisible(true);
            setClassCode(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            message.destroy();
            message.error("The action can't be completed, please try again.");
          });
      })
      .catch((error) => {
        console.log(error);
        message.destroy();
        message.error("The action can't be completed, please try again.");
      });
  };

  const onFinish = (values) => {
    message.loading("Creating " + values.name + "...", 0)
    setIsDisable(true)

    values["teacher_id"] = teacherId;
    values["teacher_name"] = teacherName;
    values["modules"] = modules;

    console.log(values);

    createClassroom(values)
  };

  const resetForm = () => {
    form.resetFields();
    setIsDisable(false);
    message.destroy();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const copyClasscode = () => {
    console.log("Copy Class Code");
    navigator.clipboard.writeText(classCode);
    setModalVisible(false);
  };

  const props = {
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error(`${file.name} is not a pdf file`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Modal
            title="Class Code"
            visible={modalVisible}
            onCancel={closeModal}
            footer={[
              <Button
                key={1}
                type="primary"
                style={{ backgroundColor: "green", borderColor: "green" }}
                onClick={() => copyClasscode()}
              >
                Copy
              </Button>,
            ]}
          >
            <h3>{classCode}</h3>
          </Modal>

          <Card
            title="Create Classroom"
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
            <Form name="complex-form" onFinish={onFinish} form={form}>
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
                  Create
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

export default CreateClassroom;
