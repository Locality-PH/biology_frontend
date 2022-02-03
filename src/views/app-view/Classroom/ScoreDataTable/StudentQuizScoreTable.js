import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Button, message} from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";

const StudentQuizScoreTable = ({studentEnrolledId, classCode}) => {
    const [studentModuleFinished, setStudentModuleFinished] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/teacher/get-student-module-finished/" + studentEnrolledId).then((response) => {
            setStudentModuleFinished(response.data)
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
            dataIndex: 'name',
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
            dataIndex: 'quiz_score',
            render: (_, result) => (
                <span>{result.quiz_score}</span>
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
                  dataSource={studentModuleFinished} 
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

export default StudentQuizScoreTable;