import React, {useState, useEffect} from 'react'
import { Card, Table, Menu, Input, Button} from 'antd';
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

const StudentsTable = () => {
    const userId = localStorage.getItem("mid");

    const [students, setStudents] = useState([]);
    const [studentsList, setStudentsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    useEffect(() => {
      setStudents([])
      setStudentsList([])
      setIsLoading(false);
            
        // axios.get("http://localhost:5000/teacher/get-classrooms/" + userId).then((response) => {
        //     setStudents(response.data)
        //     setStudentsList(response.data)
        //     setIsLoading(false);
        //     setError(null);
        //     console.log(response.data)
        //   }).catch(() => {
        //     setIsLoading(false);
        //     setError("Could not fetch the data in the server!");
        //   });
    }
    , []);

    const deleteClassroom = (classroom_id) => {

      console.log("Delete: " + classroom_id);
      setStudentsList(
      studentsList.filter((classes) => classes.teacher_id !== classroom_id)
      )
    //   axios.post("http://localhost:5000/teacher/delete-classroom", {"user_id": userId, "classroom_id": classroom_id}).then((response) => {
    //   setDeletedMessage(response.data)
    // });

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
        ,
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
                    <Menu.Item key="2" onClick={() => deleteClassroom(result.teacher_id)}>
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
        const searchArray = e.currentTarget.value ? studentsList : students;
        const data = utils.wildCardSearch(searchArray, value);
        setStudentsList(data);
    };
    
  return (
    <>
      <Card title="Students"  extra={<><Link to="/admin/classroom"><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
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
            rowKey='class_code'
            loading={isLoading}
            scroll={{ x: "max-content" }}
        />
      </Card>
    </>
  )
}

export default StudentsTable;