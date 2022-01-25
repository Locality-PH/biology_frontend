import React, {useState, useEffect} from "react";
import ChartistGraph from "react-chartist";
import { useAuth } from "contexts/AuthContext";
import { message} from 'antd';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import LatestJoinedStudentsTable from "./Classroom/LatestJoinedStudentsTable"
import axios from "axios";

function Dashboard() {
  const teacherId = localStorage.getItem("tid");
  const { currentUser, localMid } = useAuth();

  const [classroomsCount, setClassroomsCount]= useState(0)
  const [modulesCount, setModulesCount]= useState(0)
  const [quizsCount, setQuizsCount]= useState(0)
  const [studentsCount, setStudentsCount] = useState(0)

  useEffect(() => {
    axios.get("/api/teacher/get-teacher-data-count/" + teacherId).then((response) => {
      setClassroomsCount(response.data.classrooms_count)
      setModulesCount(response.data.modules_count)
      setQuizsCount(response.data.quizs_count)
      setStudentsCount(response.data.students_count)
      }).catch(() => {
        setIsLoading(false);
        message.error("Could not fetch the data in the server!")
      });
}
, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="text-center icon-big icon-warning">
                      <i className="nc-icon nc-notes text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Classroom Count</p>
                      <Card.Title as="h4">{classroomsCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Total of Classrooms
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="text-center icon-big icon-warning">
                      <i className="nc-icon nc-paper-2 text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Module Count</p>
                      <Card.Title as="h4">{modulesCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Total of Modules
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="text-center icon-big icon-warning">
                      <i className="nc-icon nc-attach-87 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Quiz Count</p>
                      <Card.Title as="h4">{quizsCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Total of Quizzes
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="text-center icon-big icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Student Count</p>
                      <Card.Title as="h4">{studentsCount}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  Total of Students Enrolled
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <LatestJoinedStudentsTable></LatestJoinedStudentsTable>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
