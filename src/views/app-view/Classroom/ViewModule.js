import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ModuleLessonsTable from "./ScoreDataTable/ModuleLessonsTable"
import ModuleStudentsQuizScoreTable from "./ScoreDataTable/ModuleStudentsQuizScoreTable"

const ViewModule = ({match}) => {
    const moduleId = match.params.module_id
    const classCode = match.params.class_code
    
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                      <ModuleLessonsTable moduleId={moduleId} classCode={classCode}></ModuleLessonsTable>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="12">
                      <ModuleStudentsQuizScoreTable moduleId={moduleId} classCode={classCode}></ModuleStudentsQuizScoreTable>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewModule
