import React, { useState, useRef, useContext } from "react";
import { Checkbox, Button, Divider, Row, Col } from "antd";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./StudentListDocunment";
import { StudentContext } from "../StudentWrapper";
const options = [
  { title: "Roll No", dataIndex: ["studentData", "rollNo"] },
  { title: "Name", dataIndex: ["studentData", "name"] },
  { title: "Father Name", dataIndex: ["studentData", "fatherName"] },
  { title: "Phone No", dataIndex: ["studentData", "phoneNo"] }
];
const CheckboxGroup = Checkbox.Group;
const StudentList = () => {
  const { tableData } = useContext(StudentContext);
  const [checkedList, setCheckedList] = useState([]);
  const componentRef = useRef();

  const onChange = e => {
    console.log(e);
    setCheckedList([...e]);
  };

  const handlePrintDocument = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <>
      <CheckboxGroup onChange={onChange}>
        <Row>
          {options?.map((data, index) => (
            <Col span={8}>
              <Checkbox value={data}>{data.title}</Checkbox>
            </Col>
          ))}
        </Row>
      </CheckboxGroup>

      <br />
      <br />
      <br />
      <div>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "8px" }}
          onClick={handlePrintDocument}
        >
          Print
        </Button>
        <div style={{ display: "none" }}>
          <ComponentToPrint
            data={tableData?.data}
            columns={checkedList}
            ref={componentRef}
          />
        </div>
      </div>
    </>
  );
};

export default StudentList;
