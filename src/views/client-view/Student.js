import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Checkbox,
  message,
  Col,
  Row,
  Card,
  Button,
  Avatar,
  Table,
} from "antd";
const { Header, Content, Footer, Sider } = Layout;
import utils from "utils";
import axios from "axios";

const Student = ({match}) => {
  const classCode = match.params.class_code
  const [classroomStudents, setClassroomStudents] = useState([]);
  const [teaherName, setTeacherName] = useState("")

  useEffect(() => {
    message.loading("Loading students...", 0)
    axios.get("/api/student/get-classroom-students/" + classCode).then((response) => {
      message.destroy()
      setClassroomStudents(response.data)
      }).catch(() => {
        message.destroy()
        message.error("Could not fetch the data in the server!")
      });

      axios.get("/api/student/get-classroom-teacher-fullname/" + classCode).then((response) => {
        message.destroy()
        setTeacherName(response.data)
        }).catch(() => {
          message.destroy()
          message.error("Could not fetch the data in the server!")
        });
}
, []);

  const StudentSampleData = [
    {
      uid: 1,
      member_name: "John Cena",
      fullname: "ROJHON BUENAVENTYRA",
      avatarColor: "04d182",
    },
    {
      uid: 2,
      member_name: "John Cena",
      fullname: "mama ni moises",
      avatarColor: "04d182",
    },
  ];
  const TeacherData = [
    {
      uid: 1,
      fullname: teaherName,
      avatarColor: "04d182",
    },
  ];
  const teacherMasterListColumn = [
    {
      title: "Member Name",
      dataIndex: "email",
      key: "email",
      render: (text, member) => (
        <div className="text-center d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: "#" + member.avatarColor }}
            src={member?.photURL}
          >
            {utils.getNameInitial(member.fullname)}
          </Avatar>
          <span className="ml-2">{member.fullname}</span>
        </div>
      ),
    },
  ];

  const studentMasterListColumn = [
    {
      title: "Member Name",
      dataIndex: "email",
      key: "email",
      render: (text, member) => (
        <div className="text-center d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: "#" + "04d182"}}
            src={member?.photURL}
          >
            {utils.getNameInitial(member.student_name)}
          </Avatar>
          <span className="ml-2">{member.student_name}</span>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Row justify="center">
            <Col
              justify="center"
              className=""
              xs={24}
              sm={22}
              md={20}
              lg={18}
              xl={18}
            >
              <Row justify="center" gutter={40}>
                <Col
                  justify="center"
                  xxs={1}
                  xs={24}
                  sm={12}
                  md={15}
                  lg={15}
                  xl={15}
                >
                  {" "}
                  <div className="content-data" style={{ textAlign: "center" }}>
                    {" "}
                    <div className="text-left border-bottom">
                      <h3>Teacher</h3>
                      <div className="table-responsive">
                        <Table
                          dataSource={TeacherData}
                          columns={teacherMasterListColumn}
                          rowKey="uid"
                          scroll={{ x: "max-content" }}
                          pagination={false}
                          showHeader={false}
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-left border-bottom">
                      <h3>Students</h3>{" "}
                      <Table
                        dataSource={classroomStudents}
                        columns={studentMasterListColumn}
                        rowKey="_id"
                        scroll={{ x: "max-content" }}
                        pagination={false}
                        showHeader={false}
                      />
                    </div>
                  </div>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Student;
