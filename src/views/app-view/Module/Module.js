import React from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import MyModule from "./MyModule";
import PresetModule from "./PresetModule";

const Module = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <MyModule></MyModule>
                    </Col>
                </Row>

                <Row>
                    <Col md="12">
                        <PresetModule></PresetModule>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Module
