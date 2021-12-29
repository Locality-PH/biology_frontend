import React, {useState, useEffect} from "react";
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {message, Button} from "antd"
import { Document, Page, pdfjs} from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

import samplePDF from "./pdf/Evaluation.pdf"
import { Link } from "react-router-dom";
import axios from "axios";

const ViewModule = ({match}) => {
    const moduleId = match.params.module_id
   
    const [numPages, setNumPages] = useState(null);
    const [modulePDF, setModulePDF] = useState(null)

    useEffect(() => {
      axios.get("http://localhost:5000/teacher/get-module/" + moduleId).then((response) => {
        const pdfData = response.data.module_file.file
        var len = pdfData.length
        var bytes = new Uint8Array(len);

        for(var i = 0; i < len; i++){
          bytes[i] = pdfData.charCodeAt(i)
        }

        const blob = new Blob(bytes, {type: "application/pdf"})
        setModulePDF(samplePDF)
      }).catch(() => {
        message.error("The action can't be completed, please try again.")
      });
    }
    , []);

    const onDocumentLoadSuccess = ({numPages} ) => {
      setNumPages(numPages);
    }

    console.log(modulePDF)

    return (
        <>
          <Container fluid>
            <Row>
              <Col md="12">
                <Link to={`/admin/classroom/${match.params.class_code}`} ><Button type="primary" style={{backgroundColor: "green", borderColor: "green"}}>Back</Button></Link>
                <Document
                  file={modulePDF}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                      />
                    ),
                  )}
                </Document>
              </Col>
            </Row>
          </Container>
        </>
    );
}

export default ViewModule;
