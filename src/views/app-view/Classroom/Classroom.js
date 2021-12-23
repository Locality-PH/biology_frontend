import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Menu, Input, Button} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import { 
	EyeOutlined,
    SearchOutlined
} from '@ant-design/icons';
import axios from "axios";

const Classroom = () => {
    const userId = localStorage.getItem("mid");

    console.log(userId)

    const [classrooms, setClassrooms] = useState([]);
    const [classroomsList, setClassroomsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/teacher/get-classrooms/" + userId).then((response) => {
            setClassrooms(response.data)
            setClassroomsList(response.data)
            setIsLoading(false);
            setError(null);
            console.log(response.data)
          }).catch(() => {
            setIsLoading(false);
            setError("Could not fetch the data in the server!");
          });
    }
    , [deletedMessage]);

    const deleteClassroom = (classroom_id) => {
      axios.post("http://localhost:5000/teacher/delete-classroom", {"user_id": userId, "classroom_id": classroom_id}).then((response) => {
      setDeletedMessage(response.data)
    });

    }

    const tableColumns = [
        {
            title: 'Classroom Code',
            dataIndex: 'class_code',
            render: (_, record) => (
                <span>{record.class_code}</span>
            )
        },
        {
            title: 'Classroom Name',
            dataIndex: 'name',
            render: (_, record) => (
                <Flex>
                    <AvatarStatus src="/img/thumbs/thumb-5.jpg" size={30} name={record.name}/>
                </Flex>
            )
        },
        {
            title: 'Section',
            dataIndex: 'section_name',
            render: (_, record) => (
                <span>{record.section_name}</span>
            )
        },
        ,
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <EllipsisDropdown 
            menu={
                <Menu>
                    <Menu.Item key="0">
                        <Link to={`classroom/${record.class_code}`}>
                            <EyeOutlined />
                            <span className="ml-2">View</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to={`classroom/${record.class_code}`}>
                            <EyeOutlined />
                            <span className="ml-2">Update</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="2" onClick={() => deleteClassroom(record.teacher_id)}>
                        <>
                            <EyeOutlined />
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