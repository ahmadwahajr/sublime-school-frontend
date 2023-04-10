import React, { useState, useRef, useContext } from "react";
import { Row, Input, Button, Form, Spin } from "antd";
import { Select, DatePicker, message, Radio, Popconfirm } from "antd";
import ClassNoData from "../../redux/constants/classNoConstants";
import SystemConstants from "../../redux/constants/systemConstants";
import {
  insertStudentsData,
  editStudentData,
  deleteStudentData,
  addStudentAction,
  editStudentAction,
  deleteStudentAction
} from "../../redux/actions/student-actions";
import { LoadingOutlined } from "@ant-design/icons";
import { StudentContext } from "./StudentWrapper";

const layout = {
  wrapperCol: {
    span: 17
  },
  labelCol: {
    span: 8
  }
};
const tailLayout = {
  wrapperCol: { offset: 11, span: 16 }
};

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 16,
      color: "black",
      marginLeft: "4px"
    }}
    spin
  />
);

export default function InsertStudentsData({
  type,
  initialValues,
  setEditModal
}) {
  const formRef = useRef(null);
  const { tableData, settableData, filters } = useContext(StudentContext);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [filteredChoice, setfilteredChoice] = useState(filters?.enrolledIn);

  const loadingFunc = (bool1, bool2, message = undefined) => {
    message && message.success(message);
    setLoading(bool1);
    setDisabled(bool2);
  };

  const dataInsertion = async values => {
    loadingFunc(true, true);
    const data = await insertStudentsData(values);
    if (data?.data?.status === "success") {
      addStudentAction(data?.data, settableData, filters);
      loadingFunc(false, false, "Student Added");
    } else {
      message.error(data);
      loadingFunc(false, false);
    }
  };
  const dataUpdation = async (values, type) => {
    loadingFunc(true, true);
    setConfirmLoading(true);
    const dataToSend = {
      ...values,
      _id: initialValues._id,
      balance: { ...initialValues.balance, ...values.balance },
      fee: { ...initialValues.fee, ...values.fee }
    };
    let data;
    if (type === "delete")
      data = await deleteStudentData({ _id: initialValues._id });
    else data = await editStudentData(dataToSend);
    if (data?.data?.status === "success") {
      if (type === "delete")
        deleteStudentAction(
          initialValues._id,
          tableData,
          settableData,
          filters
        );
      else editStudentAction(data?.data, tableData, settableData, filters);
      message.success("Student Updated");
      setEditModal(false);
    } else {
      message.error(data);
      loadingFunc(false, false);
      setConfirmLoading(false);
    }
  };
  const onFinish = values => {
    if (type === "Insert") dataInsertion(values);
    if (type === "Edit") dataUpdation(values, "edit");
  };

  const onReset = () => {
    formRef?.current?.resetFields();
  };
  const onFinishFailed = errorInfo => {
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
              message: "Please input your Name!"
            }
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
              message: "Please input Father's Name!"
            }
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
              message: "Please input your Contact!"
            }
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
              message: "Please input your Contact No!"
            }
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
              message: "Please input Roll No!"
            }
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
              message: "Please input Tution Fee!"
            }
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input placeholder="Tution Fee" type="number" />
        </Form.Item>

        {type === "Insert" && filteredChoice === "school" && (
          <Form.Item
            label="Registration Fee"
            name={["fee", "registrationFee"]}
            rules={[
              {
                required: true,
                message: "Please input Registration Fee!"
              }
            ]}
            style={{ display: "inline-block", width: "calc(50%)" }}
          >
            <Input placeholder="Registration Fee" type="number" />
          </Form.Item>
        )}

        {filteredChoice === "school" ? (
          <>
            <Form.Item
              label="Annual Fee"
              name={["fee", "annualFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Annual Fee!"
                }
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
                  message: "Please input Syllabus Fee!"
                }
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Syllabus Fee" type="number" />
            </Form.Item>
            <Form.Item
              label="Missalaneous Fee"
              name={["balance", "missalaneousBalance"]}
              rules={[
                {
                  required: true,
                  message: "Please input Missalaneous Fee!"
                }
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
                  message: "Please input Notes Fee!"
                }
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
                  message: "Please input Test session Fee!"
                }
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <Input placeholder="Test session Fee" type="number" />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Enroll In:"
          name="enrolledIn"
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Radio.Group
            disabled={type === "Edit"}
            onChange={e => {
              setfilteredChoice(e.target.value);
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
              onConfirm={values => dataUpdation(values, "delete")}
              okButtonProps={{
                loading: confirmLoading
              }}
              onCancel={() => setOpen(false)}
            >
              <Button
                type="danger"
                onClick={() => setOpen(true)}
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
