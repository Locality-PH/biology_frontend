import React, {useState} from 'react';
import { Modal, Button, message} from "antd"
import axios from "axios"

const LeaveClassroom = ({match}) => {
  const studentId = localStorage.getItem("sid");
  const classCode = match.params.class_code
  const [modalVisible, setModalVisible] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    window.location.assign("/home")
  };

  const leaveClassroom = () => {
    message.loading("Leaving classroom...", 0)
    axios
      .post("/api/student/unenrol-classroom", {"student_id": studentId, "class_code": classCode})
      .then((response) => {
        if (response.data == "Error") {
          message.destroy();
          message.error("Error, please try again later.");
          window.location.assign("/home")
        } else if(response.data == "Unenrol"){
          message.destroy();
          message.success("Successfully Unenrol!");
          setModalVisible(false);
          window.location.assign("/home")
        }
      })
      .catch(() => {
        message.destroy();
        message.error("Error!");
      });
  }


  return <>
  <Modal
        title="Are you sure to leave the classroom?"
        visible={modalVisible}
        onCancel={closeModal}
        maskClosable={false}
        footer={[
          <Button
            key={1}
            type="primary"
            style={{ backgroundColor: "grey", borderColor: "grey" }}
            disabled={isDisable}
            onClick={closeModal}
          >
            Cancel
          </Button>,
          <Button
          key={2}
          type="primary"
          style={{ backgroundColor: "green", borderColor: "green" }}
          disabled={isDisable}
          onClick={leaveClassroom}
        >
          Leave
        </Button>
        ]}
      >
        <h4>You'll no longer be able to see the classroom modules and take the quiz.</h4>
      </Modal>
        </>;
};

export default LeaveClassroom;
