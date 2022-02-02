import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import StudentLessonScoreTable from "./ScoreDataTable/StudentLessonScoreTable"
import StudentQuizScoreTable from "./ScoreDataTable/StudentQuizScoreTable"

const ViewStudent = ({match}) => {
    const studentEnrolledId = match.params.student_enrolled_id
    const classCode = match.params.class_code
    
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                      <StudentLessonScoreTable studentEnrolledId={studentEnrolledId} classCode={classCode}></StudentLessonScoreTable>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="12">
                      <StudentQuizScoreTable studentEnrolledId={studentEnrolledId} classCode={classCode}></StudentQuizScoreTable>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewStudent
