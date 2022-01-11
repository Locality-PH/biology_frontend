import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Menu, Input, Button, message} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import {
	EyeOutlined,
  SearchOutlined,
  EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import axios from "axios";

const StudentsTable = ({classCode}) => {
    const [students, setStudents] = useState([]);
    const [studentsList, setStudentsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/teacher/get-classroom-students/" + classCode).then((response) => {
            setStudents(response.data)
            setStudentsList(response.data)
            setIsLoading(false);
            setError(null);
            console.log(response.data)
          }).catch(() => {
            setIsLoading(false);
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const deleteStudent = (studentId, studentEnrolledId, studentName) => {
      message.loading("Removing " + studentName, 0)

      axios.post("http://localhost:5000/teacher/delete-student", {"student_id": studentId, "student_enrolled_id": studentEnrolledId, "class_code": classCode}).then((response) => {
        if(response.data == "Deleted"){
          message.destroy()
          setStudentsList(
            studentsList.filter((students) => students.students !== studentId)
            )
          message.success(studentName + " has been successfully deleted")
        }
    });

    }

    const tableColumns = [
        {
            title: 'Student Name',
            dataIndex: 'name',
            render: (_, result) => (
                <Flex>
                    <AvatarStatus src="/img/thumbs/thumb-5.jpg" size={30} name={result.student_name}/>
                </Flex>
            )
        },
        {
          title: 'Student Id',
          dataIndex: 'id',
          render: (_, result) => (
            <span>{result.students}</span>
          )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, result) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    <Menu.Item key="0">
                        <Link to={`${classCode}/student/${result.students}`}>
                            <EyeOutlined />
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={() => deleteStudent(result.students, result.teacher_id, result.student_name)}>
                        <>
                            <DeleteOutlined />
                            <span className="ml-2">Remove</span>
                        </>
                    </Menu.Item>
                </Menu>
            }
        />
            )
        }
      ]

    const onClassroomSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? studentsList : students;
        const data = utils.wildCardSearch(searchArray, value);
        setStudentsList(data);
    };
    
  return (
    <>
      <Card title="Your Students" extra={<><Link to="/admin/classroom"><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
        <Flex
          alignItems="center"
          className=""
          justifyContent="between"
          mobileFlex={false}
        >
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mb-3 mr-md-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => onClassroomSearch(e)}
              />
            </div>
          </Flex>
        </Flex>
        <Table
            pagination={true}
            columns={tableColumns} 
            dataSource={studentsList} 
            rowKey='students'
            loading={isLoading}
            scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  )
}

export default StudentsTable;