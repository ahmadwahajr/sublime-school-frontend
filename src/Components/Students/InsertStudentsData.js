import React, { useState, useRef } from "react";
import { Row, Input, Button, Form, Spin } from "antd";
import { Select, DatePicker, message, Radio, Popconfirm } from "antd";
import ClassNoData from "../../redux/constants/classNoConstants";
import SystemConstants from "../../redux/constants/systemConstants";
import {
  insertStudentsData,
  editStudentData,
  deleteStudentData,
} from "../../redux/actions/student-actions";
import { LoadingOutlined } from "@ant-design/icons";

export default function InsertStudentsData({
  filters,
  addStudentRecord,
  type,
  initialValues,
  editStudentRecord,
  setEditModal,
  deleteStudentRecord,
}) {
  const formRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [filteredChoice, setfilteredChoice] = useState(filters.enrolledIn);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 16,
        color: "black",
        marginLeft: "4px",
      }}
      spin
    />
  );
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    setDisabled(true);
    const data = await deleteStudentData({ _id: initialValues._id });
    if (data?.data?.status === "success") {
      deleteStudentRecord(initialValues._id);
      message.success("Student Updated");
      setOpen(false);
      setConfirmLoading(false);
      setEditModal(false);
    } else {
      message.error(data);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const layout = {
    wrapperCol: {
      span: 17,
    },
    labelCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 11, span: 16 },
  };
  const dataInsertion = async (values) => {
    setLoading(true);
    setDisabled(true);
    const data = await insertStudentsData(values);
    if (data?.data?.status === "success") {
      addStudentRecord(data?.data);
      message.success("Student Added");
      setLoading(false);
      setDisabled(false);
    } else {
      message.error(data);
      setLoading(false);
      setDisabled(false);
    }
  };
  const dataUpdation = async (values) => {
    setLoading(true);
    setDisabled(true);

    const data = await editStudentData({ ...values, _id: initialValues._id });
    if (data?.data?.status === "success") {
      console.log(data?.data);
      editStudentRecord(data?.data);
      message.success("Student Updated");
      setEditModal(false);
    } else {
      message.error(data);
      setLoading(false);
      setDisabled(false);
    }
  };
  const finishFunction = (values) => {
    if (type === "Insert") dataInsertion(values);
    if (type === "Edit") dataUpdation(values);
  };
  const onFinish = (values) => {
    finishFunction(values);
  };

  const onReset = () => {
    formRef?.current?.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  return (
    <div>
      <Row gutter={16} justify="center">
        <h2>{type} Data</h2>
      </Row>
      <Form
        {...layout}
        name="basic"
        ref={formRef}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        justify="center"
        initialValues={initialValues}
        preserve={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="name" placeholder="Student Name" />
        </Form.Item>
        <Form.Item
          label="Father Name"
          name="fatherName"
          rules={[
            {
              required: true,
              message: "Please input Father's Name!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="fatherName" placeholder="Father Name" />
        </Form.Item>
        <Form.Item
          label="Phone # 1"
          name="phoneNo1"
          rules={[
            {
              required: true,
              message: "Please input your Contact!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="phoneNo1" placeholder="Contact # 1" />
        </Form.Item>
        <Form.Item
          label="Phone # 2"
          name="phoneNo2"
          rules={[
            {
              required: false,
              message: "Please input your Contact No!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="phoneNo2" placeholder="Contact # 2" />
        </Form.Item>
        <Form.Item
          label="Roll No"
          name="rollNo"
          rules={[
            {
              required: true,
              message: "Please input Roll No!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="rollNo" placeholder="Roll No" />
        </Form.Item>
        <Form.Item
          label="Class No"
          name={["classNo"]}
          style={{ display: "inline-block", width: "calc(50%)" }}
          rules={[{ required: true, message: "Class is required" }]}
        >
          <Select placeholder="Class No" disabled={type === "Edit"}>
            {ClassNoData.map((data, index) => (
              <Select.Option key={data.label} value={data.value}>
                {data.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tution Fee"
          name={["fee", "tutionFee"]}
          rules={[
            {
              required: true,
              message: "Please input Tution Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input placeholder="Tution Fee" type="number" />
        </Form.Item>

        {filteredChoice === "school" ? (
          <>
            <Form.Item
              label="Annual Fee"
              name={["fee", "annualFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Annual Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Annual Fee" type="number" />
            </Form.Item>
            <Form.Item
              label="Syllabus Fee"
              name={["fee", "syllabusFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Syllabus Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Syllabus Fee" type="number" />
            </Form.Item>
            <Form.Item
              label="Registration Fee"
              name={["fee", "registrationFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Registration Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Registration Fee" type="number" />
            </Form.Item>
            <Form.Item
              label="Missalaneous Fee"
              name={["balance", "missalaneousBalance"]}
              rules={[
                {
                  required: true,
                  message: "Please input Missalaneous Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Missalaneous Fee" type="number" />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              label="Notes Balance"
              name={["balance", "notesBalance"]}
              rules={[
                {
                  required: true,
                  message: "Please input Notes Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Notes Fee" type="number" />
            </Form.Item>
            <Form.Item
              label="Test session Fee"
              name={["fee", "testSessionFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Test session Fee!",
                },
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Test session Fee" type="number" />
            </Form.Item>
          </>
        )}

        {/* <Form.Item
          label="Dubata/Tie"
          name="dubata"
          rules={[
            {
              required: true,
              message: "Please input Dubata",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="dubata" placeholder="Dubata/Tie" />
        </Form.Item> */}
        {/* <Form.Item
          label="Batch"
          name="batch"
          rules={[
            {
              required: true,
              message: "Please input Batch No!"
            }
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="batch" placeholder="Batch" />
        </Form.Item> */}
        <Form.Item
          label="Enroll In:"
          name="enrolledIn"
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Radio.Group
            disabled={type === "Edit"}
            onChange={(e) => {
              setfilteredChoice(e.target.value);
              console.log("Target value is: " + e.target.value);
            }}
          >
            {SystemConstants.map((data, index) => (
              <Radio key={data.label} value={data.value}>
                {data.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="admissionDate"
          label="Admission Date"
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <DatePicker placeholder="Admission Date" />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
            disabled={disabled}
          >
            Submit {loading && <Spin indicator={antIcon} />}
          </Button>
          {type === "Insert" && (
            <Button htmlType="button" onClick={onReset} disabled={disabled}>
              Reset
            </Button>
          )}
          {type === "Edit" && (
            <Popconfirm
              title="Are you sure you want to delete?"
              description="Student data deletion"
              open={open}
              onConfirm={handleOk}
              okButtonProps={{
                loading: confirmLoading,
              }}
              onCancel={handleCancel}
            >
              <Button
                type="danger"
                onClick={showPopconfirm}
                disabled={disabled}
              >
                Delete
              </Button>
            </Popconfirm>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
