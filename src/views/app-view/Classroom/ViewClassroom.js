import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import StudentsTable from "./StudentsTable"
import ModulesTable from "./ModulesTable"

const ViewClassroom = ({match}) => {
    const class_code = match.params.class_code
    
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <StudentsTable classCode={class_code}></StudentsTable>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="12">
                        <ModulesTable classCode = {class_code}></ModulesTable>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ViewClassroom
