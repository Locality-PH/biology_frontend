import React, { useState, useEffect} from "react";
import { Card, Button, message } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Link } from "react-router-dom";
import axios from "axios";

const ModulePages = ({ moduleId }) => {
  const [numPages, setNumPages] = useState(null);
  const [modulePDF, setModulePDF] = useState(null);
  
  useEffect(() => {
    message.loading("Loading pdf...", 0)
    axios
    .get("/api/student/get-module/" + moduleId)
    .then((response) => {
      console.log("File PDF")
      message.destroy();
      setModulePDF(response.data);
    })
    .catch(() => {
      message.error("The action can't be completed, please try again.");
    });

  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    message.destroy();
    setNumPages(numPages);
  };

  return (
    <>
      <div>
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
