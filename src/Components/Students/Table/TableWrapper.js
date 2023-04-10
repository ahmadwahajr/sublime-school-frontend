import React, { useState, useContext } from "react";
import { Row, Col, Modal } from "antd";
import dayjs from "dayjs";
import Table from "./TableComp";
import ChallanComp from "./ChallanDocument/ChallanComp";
import HistoryComp from "./History";
import { StudentContext } from "../StudentWrapper";
import {
  getFeeHistory,
  payStudentAction
} from "../../../redux/actions/student-actions";
import UpdateComponent from "../StudentCUD";
function TableWrapper() {
  const { tableData, settableData, filters } = useContext(StudentContext);
  const [editModal, setEditModal] = useState(false);
  const [challanModal, setChallanModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [historyData, setHistoryData] = useState(null);

  const handleCancel = () => {
    setEditModal(false);
  };
  const manageHistory = async id => {
    setHistoryModal(true);
    const data = await getFeeHistory({ _id: id });
    if (data) setHistoryData(data);
  };
  const handleChangeAction = async ({ key }, record) => {
    if (key === "1") {
      const date = dayjs(record?.studentData?.admissionDate);
      const values = { ...record?.studentData, admissionDate: date };
      setEditData(values);
      setEditModal(true);
    }
    if (key === "2") {
      const { studentData } = record;
      setEditData({
        ...studentData,
        balance: { ...studentData?.balance, discountFee: 0 }
      });
      setChallanModal(true);
    }
    if (key === "3") {
      manageHistory(record?.studentData?._id);
    }
  };

  const payStudentFee = record => {
    payStudentAction(record, tableData, settableData);
  };

  return (
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
          <UpdateComponent
            addStudentRecord={null}
            type="Edit"
            initialValues={editData}
            setEditModal={setEditModal}
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
        <Modal
          title="Student Record"
          open={historyModal}
          onCancel={() => setHistoryModal(false)}
          footer={false}
          destroyOnClose
          width="70%"
        >
          <HistoryComp data={historyData} />
        </Modal>
        <Table
          data={tableData?.data}
          loading={tableData.loading}
          paginationSize={tableData.paginationSize}
          handleChangeAction={handleChangeAction}
        ></Table>
      </Col>
    </Row>
  );
}

export default TableWrapper;
