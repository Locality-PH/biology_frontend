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

const ModuleStudentsLessonScoreTable = ({match}) => {
    const moduleLessonId = match.params.module_lesson_id
    const moduleId = match.params.module_id
    const classCode = match.params.class_code
    const [finishedStudent, setFinishedStudent] = useState([]);
    const [finishedStudentList, setFinishedStudentList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fileName, setFileName] = useState("")

    useEffect(() => {
        axios.get("/api/scoreboard/get-students-lesson-score/" + moduleLessonId).then((response) => {
            setFinishedStudent(response.data)
            setFinishedStudentList(response.data)
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
            title: 'Activity Score',
            dataIndex: 'score',
            render: (_, result) => (
                <span>{result.score}</span>
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
      label: "Quiz Score", key: "score"
    }]
    
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Lesson Finished Student" extra={<> 
              <Link style={{marginRight: "1rem"}} to={"/admin/classroom/" + classCode+ "/module/" + moduleId}><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link>
            <CSVLink hidden={isLoading} data={finishedStudentList} headers={headers} filename="ScoreData.csv">
            <Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Download ScoreData.csv</Button>
          </CSVLink></>}>
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

export default ModuleStudentsLessonScoreTable;