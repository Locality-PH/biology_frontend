import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Button, message } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";

const StudentLessonScoreTable = ({ studentEnrolledId, classCode }) => {
  const [scoreData, setScoreData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/scoreboard/get-student-lesson-score/" + studentEnrolledId).then((response) => {
      setScoreData(response.data)
      setIsLoading(false);
      setError(null);
    }).catch(() => {
      message.error("Could not fetch the data in the server!")
    });
  }
    , []);

  const tableColumns = [
    {
      title: 'Lesson Name',
      dataIndex: 'lesson_name',
      render: (_, result) => (
        <span>{result.lesson_name}</span>
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
    },
    {
      title: 'Action',
      dataIndex: 'score',
      render: (_, result) => (

        <div>
          <Link
            target="_blank"
            to={`/admin/classwork/student-score/${result.student_id}/${result.mal_id}/${result.classwork_code}`}
          >
            <Button>View Activity</Button>
          </Link>
        </div>


      )
    }
  ]


  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Finished Lesson" extra={<><Link to={"/admin/classroom/" + classCode}><Button type="primary" style={{ backgroundColor: "green", borderColor: "green" }}>Back</Button></Link></>}>
              <Table
                pagination={true}
                columns={tableColumns}
                dataSource={scoreData}
                rowKey='mal_id'
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

export default StudentLessonScoreTable;