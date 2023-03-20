import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Modal } from "antd";
import dayjs from "dayjs";
import Header from "./StudentHeader";
import Table from "./Table/TableComp";
import {
  getStudentsdata,
  addStudentAction,
  editStudentAction,
  deleteStudentAction,
  payStudentAction
} from "../../redux/actions/student-actions";
import ChallanComp from "./ChallanComp";
function StudentWrapper({ message, deleteData, InsertComp, UpdateComp }) {
  const [filters, setFilters] = useState({
    classNo: "playgroup",
    enrolledIn: "school"
  });
  const [tableData, settableData] = useState({
    data: [],
    loading: true,
    paginationSize: 15
  });

  const [editModal, setEditModal] = useState(false);
  const [challanModal, setChallanModal] = useState(false);
  const [editData, setEditData] = useState({});

  const handleCancel = () => {
    setEditModal(false);
  };
  const dataFetch = async filters => {
    settableData(prevData => {
      return { ...prevData, loading: true };
    });
    const data = await getStudentsdata(filters);
    if (data) {
      settableData(prevData => {
        return { ...prevData, loading: false, data: data };
      });
    } else {
      settableData(prevData => {
        return { ...prevData, loading: false };
      });
    }
  };
  useEffect(() => {
    dataFetch(filters);
    return () => {
      dataFetch();
    };
  }, [filters]);

  const onChangeFee = (e, data) => {};
  const handleChangeAction = ({ key }, record) => {
    if (key === "1") {
      const date = dayjs(record?.studentData?.admissionDate);
      const values = { ...record?.studentData, admissionDate: date };
      setEditData(values);
      setEditModal(true);
    }
    if (key === "2") {
      setEditData(record?.studentData);
      setChallanModal(true);
    }
  };
  const editStudentRecord = record => {
    editStudentAction(record, tableData, settableData, filters);
  };
  const payStudentFee = record => {
    payStudentAction(record, tableData, settableData);
  };
  const addStudentRecord = record => {
    addStudentAction(record, settableData, filters);
  };
  const deleteStudentRecord = record => {
    deleteStudentAction(record, tableData, settableData, filters);
  };
  let enrollment = filters.enrolledIn === "school" ? "School" : "Academy";
  let messages = enrollment + " " + message;
  return (
    <div style={{ padding: "40px 20px" }}>
      <Header
        message={messages}
        deleteData={deleteData}
        InsertComp={InsertComp}
        UpdateComp={UpdateComp}
        filters={filters}
        setFilters={setFilters}
        addStudentRecord={addStudentRecord}
      />
      <Row gutter={16} style={{ margin: "30px 00px" }} justify="center">
        <Col span={24} xs={0} sm={24}>
          <Modal
            title="Student Record"
            open={editModal}
            onCancel={handleCancel}
            footer={false}
            destroyOnClose
            width="85%"
          >
            <InsertComp
              filters={filters}
              addStudentRecord={null}
              type="Edit"
              initialValues={editData}
              editStudentRecord={editStudentRecord}
              setEditModal={setEditModal}
              deleteStudentRecord={deleteStudentRecord}
            />
          </Modal>
          <Modal
            title="Student Record"
            open={challanModal}
            onCancel={() => setChallanModal(false)}
            footer={false}
            destroyOnClose
            width="50%"
          >
            <ChallanComp
              filters={filters}
              initialValues={editData}
              payStudentFee={payStudentFee}
              setEditModal={setChallanModal}
            />
          </Modal>
          <Table
            data={tableData?.data}
            loading={tableData.loading}
            paginationSize={tableData.paginationSize}
            handleChangeAction={handleChangeAction}
          ></Table>
        </Col>
      </Row>
    </div>
  );
}

export default StudentWrapper;
