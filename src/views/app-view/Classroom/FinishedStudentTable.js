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

const FinishedStudentTable = ({moduleId, classCode}) => {
    const [finishedStudent, setFinishedStudent] = useState([]);
    const [finishedStudentList, setFinishedStudentList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/teacher/finished-students/" + moduleId).then((response) => {
            setFinishedStudent(response.data)
            setFinishedStudentList(response.data)
            setIsLoading(false);
            setError(null);
          }).catch(() => {
            setIsLoading(false);
            message.error("Could not fetch the data in the server!")
          });
    }
    , []);

    const tableColumns = [
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            render: (_, result) => (
                <span>{result.student_name}</span>
            )
        },
        {
            title: 'Quiz Score',
            dataIndex: 'quiz_score',
            render: (_, result) => (
                <span>{result.quiz_score}</span>
            )
        }
      ]

    const onStudentSearch = (e) => {
        const value = e.currentTarget.value;
        const searchArray = e.currentTarget.value ? finishedStudentList : finishedStudent;
        const data = utils.wildCardSearch(searchArray, value);
        setFinishedStudentList(data);
    };
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Finished Student" extra={<><Link to={`/admin/classroom/${classCode}`}><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
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
                      onChange={(e) => onStudentSearch(e)}
                    />
                  </div>
                </Flex>
              </Flex>
              <Table
                  pagination={true}
                  columns={tableColumns} 
                  dataSource={finishedStudentList} 
                  rowKey='_id'
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

export default FinishedStudentTable;