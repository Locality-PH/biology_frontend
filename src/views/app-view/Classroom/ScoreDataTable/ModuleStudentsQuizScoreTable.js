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
import {CSVLink} from "react-csv"

const ModuleStudentsQuizScoreTable = ({moduleId, classCode}) => {
    const [finishedStudent, setFinishedStudent] = useState([]);
    const [finishedStudentList, setFinishedStudentList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    const [csvData, setCsvData] = useState([])
    const [fileName, setFileName] = useState("")

    const menu_icons_style = {
      display: "inline-flex",
      paddingRight: "5px"
    }

    useEffect(() => {
        axios.get("/api/teacher/finished-students/" + moduleId).then((response) => {
            setFinishedStudent(response.data.finished_student)
            setFinishedStudentList(response.data.finished_student)
            setFileName(response.data.module_name + ".csv")
            setIsLoading(false);
            setError(null);
          }).catch(() => {
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
            title: 'Finished at',
            dataIndex: 'finished_at',
            render: (_, result) => (
                <span>{result.finished_at}</span>
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

    const headers = [{
      label: "Student Name", key: "student_name"
    },
    {
      label: "Finished at", key: "finished_at"
    },
    {
      label: "Quiz Score", key: "quiz_score"
    }]
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Module Finished Student" extra={ <CSVLink hidden={isLoading} data={finishedStudentList} headers={headers} filename={fileName}>
            <Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Download {fileName}</Button>
          </CSVLink>}>
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

export default ModuleStudentsQuizScoreTable;