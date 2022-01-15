import React, { useState } from "react";
import { Card, Button, message } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Link } from "react-router-dom";
import axios from "axios";

const ModulePages = ({ moduleId, fileName }) => {
  const [hidden, setHidden] = useState(false);

  const downloadModule = () => {
    console.log("Downloading");
    window.open(
      "/student/download-module/" + moduleId,
      "_blank"
    );
  };

  const viewModule = () => {
    message.loading("Loading " + fileName + "...", 0)

    axios
    .get("api/student/get-module/" + moduleId)
    .then((response) => {
      setModulePDF(response.data);
    })
    .catch(() => {
      message.error("The action can't be completed, please try again.");
    });

    setHidden(true);
  };

  const [numPages, setNumPages] = useState(null);
  const [modulePDF, setModulePDF] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    message.destroy();
    setNumPages(numPages);
  };

  return (
    <>
      <Card
        hidden={hidden}
        title={
          <a
            style={{ color: "blue", textDecoration: "underline" }}
            onClick={() => viewModule()}
          >
            {fileName}
          </a>
        }
        extra={
          <Button
            type="primary"
            onClick={() => downloadModule()}
            style={{ backgroundColor: "green", borderColor: "green" }}
          >
            Download
          </Button>
        }
      >
        <p>Read your module carefully :)</p>
      </Card>
      <div hidden={!hidden}>
        <Document
          noData=""
          file={modulePDF}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </>
  );
};

export default ModulePages;
