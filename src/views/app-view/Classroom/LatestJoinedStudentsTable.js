import React, {useState, useEffect} from 'react'
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Card, Table, Menu, Input, Button, message} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import axios from "axios";

const LatestJoinedStudentsTable = () => {
    const teacherId = localStorage.getItem("tid");

    const [latestJoinedStudentsList, setLatestJoinedStudentsList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deletedMessage, setDeletedMessage] = useState("");

    useEffect(() => {
        axios.get("/api/teacher/get-latest-joined-students/" + teacherId).then((response) => {
            setLatestJoinedStudentsList(response.data)
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
            title: 'Classroom Name',
            dataIndex: 'classroom_name',
            render: (_, result) => (
              <Flex>
                <AvatarStatus src="/img/thumbs/thumb-5.jpg" size={30} name={result.classroom_name}/>
              </Flex>
            )
        },
        {
            title: 'Joined at',
            dataIndex: 'joined_at',
            render: (_, result) => (
                <span>{result.joined_date}, {result.joined_time}</span>
            )
        }
      ]

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card title="Latest Joined Student">
              <Table
                  columns={tableColumns} 
                  dataSource={latestJoinedStudentsList} 
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

export default LatestJoinedStudentsTable;