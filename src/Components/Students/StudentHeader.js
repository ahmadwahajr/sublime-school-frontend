import React, { useState, useContext } from "react";
import { Row, Col, Button, Modal, Select, Space, Radio } from "antd";
import ClassNoData from "../../redux/constants/classNoConstants";
import SystemConstants from "../../redux/constants/systemConstants";
import { StudentContext } from "./StudentWrapper";
import InsertComponent from "./StudentCUD";

function StudentHeader({ message }) {
  const { filters, setFilters } = useContext(StudentContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = value => {
    setFilters(data => ({ ...data, classNo: value }));
  };
  const handleChangeRadio = ({ target: { value } }) => {
    setFilters(data => ({ ...data, enrolledIn: value }));
  };

  return (
    <Row>
      <Col span={8} xs={24} sm={8}>
        <Row justify="left">
          <h1>{message}</h1>
        </Row>
      </Col>
      <Col span={5} xs={24} sm={5}>
        <Row justify="end" alignitem="center">
          <Space wrap>
            Class: {"  "}
            <Select
              defaultValue={filters.classNo}
              style={{ width: 120 }}
              onChange={handleChange}
              options={ClassNoData}
            />
          </Space>
        </Row>
      </Col>
      <Col span={5} xs={24} sm={5}>
        <Row justify="end">
          <Radio.Group
            options={SystemConstants}
            onChange={handleChangeRadio}
            value={filters.enrolledIn}
            optionType="button"
            buttonStyle="solid"
          />
        </Row>
      </Col>

      <Col span={5} xs={24} sm={6}>
        <Row justify="end">
          <Button type="primary" danger onClick={showModal}>
            Insert Data
          </Button>
        </Row>
      </Col>
      <Modal
        width="85%"
        title="Student Record"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose
      >
        <InsertComponent
          filters={filters}
          type="Insert"
          initialValues={filters}
        />
      </Modal>
    </Row>
  );
}

export default StudentHeader;
