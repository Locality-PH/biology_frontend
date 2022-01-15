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

const Classroom = () => {
    const teacherId = localStorage.getItem("tid");

    const [classrooms, setClassrooms] = useState([]);
    const [classroomsList, setClassroomsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    useEffect(() => {
        axios.get("/teacher/get-classrooms/" + teacherId).then((response) => {
            setClassrooms(response.data)
            setClassroomsList(response.data)
            setIsLoading(false);
            setError(null);
          }).catch(() => {
            setIsLoading(false);
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const deleteClassroom = (classroomId, classroomName) => {
      message.loading("Deleting " + classroomName + "...", 0)
      
      axios.post("/teacher/delete-classroom", {"teacher_id": teacherId, "classroom_id": classroomId}).then((response) => {
        if(response.data == "Deleted"){
          message.destroy()
          setClassroomsList(
            classroomsList.filter((classroom) => classroom.teacher_id !== classroomId)
            )
          message.success(classroomName + " has been successfully deleted")
        }else{
          message.destroy()
          message.error("The action can't be completed, please try again.")
        }
      }).catch(error => {
          console.log(error)
          message.destroy()
          message.error("The action can't be completed, please try again.")
      });

    }

    const tableColumns = [
        {
            title: 'Classroom Code',
            dataIndex: 'class_code',
            render: (_, result) => (
                <span>{result.class_code}</span>
            )
        },
        {
            title: 'Classroom Name',
            dataIndex: 'name',
            render: (_, result) => (
                <Flex>
                    <AvatarStatus src="/img/thumbs/thumb-5.jpg" size={30} name={result.name}/>
                </Flex>
            )
        },
        {
            title: 'Section',
            dataIndex: 'section_name',
            render: (_, result) => (
                <span>{result.section_name}</span>
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
                        <Link to={`classroom/${result.class_code}`}>
                            <EyeOutlined />
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to={`classroom/edit/${result.class_code}`}>
                            <EditOutlined />
                            <span className="ml-2">Edit</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={() => deleteClassroom(result.teacher_id, result.name)}>
                        <>
                            <DeleteOutlined />
                            <span className="ml-2">Delete</span>
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
        const searchArray = e.currentTarget.value ? classroomsList : classrooms;
        const data = utils.wildCardSearch(searchArray, value);
        setClassroomsList(data);
    };
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Your Classroom" extra={<><Link to="classroom/create-new"><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>New Classroom</Button></Link></>}>
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
                  dataSource={classroomsList} 
                  rowKey='class_code'
                  loading={isLoading}
                  scroll={{ x: "max-content" }}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Classroom;