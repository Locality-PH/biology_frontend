import React, { useState, useEffect} from "react";
import { Card, Button, message } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Link } from "react-router-dom";
import axios from "axios";

const Lesson = ({ moduleLessonId }) => {
  const [numPages, setNumPages] = useState(null);
  const [lessonPDF, setLessonPDF] = useState(null);
  
  useEffect(() => {
    message.loading("Loading Lesson...", 0)
    axios
    .get("/api/student/get-lesson/" + moduleLessonId)
    .then((response) => {
      console.log("Lesson PDF")
      message.destroy();
      setLessonPDF(response.data);
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
          file={lessonPDF}
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

export default Lesson;
