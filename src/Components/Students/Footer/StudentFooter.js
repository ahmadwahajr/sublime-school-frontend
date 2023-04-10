import React, { useState, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../Table/ChallanDocument/ChallanDocument";
import { Button, Modal } from "antd";
import StudentList from "./StudentList";
import { StudentContext } from "../StudentWrapper";

function StudentFooter() {
  const { tableData } = useContext(StudentContext);
  const [studentListModal, setStudentListModal] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const handlePrintStudentList = () => {
    setStudentListModal(true);
  };
  return (
    <>
      <span>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "8px" }}
          onClick={handlePrintStudentList}
          disabled={tableData?.data?.length === 0}
        >
          Print Student List
        </Button>
        <Modal
          title="Student Record"
          open={studentListModal}
          onCancel={() => setStudentListModal(false)}
          footer={false}
          destroyOnClose
          width="70%"
        >
          <StudentList />
        </Modal>
      </span>

      <span>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginLeft: "10px" }}
          onClick={handlePrint}
          disabled={tableData?.data?.length === 0}
        >
          Print All Challan
        </Button>
      </span>
      <div style={{ display: "none" }}>
        <ComponentToPrint personalData={tableData} ref={componentRef} />
      </div>
    </>
  );
}

export default StudentFooter;
