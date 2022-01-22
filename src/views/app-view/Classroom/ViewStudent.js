import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Button, message} from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";

const ViewStudent = ({match}) => {
    const studentEnrolledId = match.params.student_enrolled_id
    const [studentEnrolledData, setStudentEnrolledData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/teacher/get-student-enrolled-data/" + studentEnrolledId).then((response) => {
            setStudentEnrolledData(response.data)
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
            title: 'Module Name',
            dataIndex: 'name',
            render: (_, result) => (
                <span>{result.module_name}</span>
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
            <Card title="Finished Module" extra={<><Link to={"/admin/classroom/" + match.params.class_code}><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link></>}>
              <Table
                  pagination={true}
                  columns={tableColumns} 
                  dataSource={studentEnrolledData} 
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

export default ViewStudent;