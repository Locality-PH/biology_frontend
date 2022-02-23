import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Button, message } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";

const StudentQuizScoreTable = ({ studentEnrolledId, classCode }) => {
  const [scoreData, setScoreData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/scoreboard/get-student-module-score/" + studentEnrolledId).then((response) => {
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
      title: 'Module Name',
      dataIndex: 'module_name',
      render: (_, result) => (
        <span>{result.module_name}</span>
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
            <Card title="Finished Module">
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

export default StudentQuizScoreTable;