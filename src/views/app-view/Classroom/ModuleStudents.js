import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import FinishedStudentTable from "./FinishedStudentTable"

const ModuleStudents = ({match}) => {
    const moduleId = match.params.module_id
    const class_code = match.params.class_code
    
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <FinishedStudentTable moduleId={moduleId} classCode={class_code}></FinishedStudentTable>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ModuleStudents
