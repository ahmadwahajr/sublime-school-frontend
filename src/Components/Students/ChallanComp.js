import React, { useState, useRef } from "react";
import { Row, Input, InputNumber, Button, Form, Spin } from "antd";
import { Select, DatePicker, message, Radio, Popconfirm } from "antd";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ChallanDocument/ChallanDocument";

import { payStudentFeeReq } from "../../redux/actions/student-actions";
import { LoadingOutlined } from "@ant-design/icons";
export default function InsertStudentsData({
  initialValues,
  setEditModal,
  payStudentFee,
}) {
  const formRef = useRef(null);
  const componentRef = useRef();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formValues, setFormValues] = useState({
    balance: { ...initialValues?.balance },
  });
  const downloadChallan = useReactToPrint({
    content: () => componentRef.current,
  });
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const values = formRef?.current?.getFieldsValue();
    setDisabled(true);
    const data = await payStudentFeeReq({
      ...values,
      _id: initialValues._id,
    });
    if (data?.data?.status === "success") {
      console.log(data?.data);
      payStudentFee(data?.data);
      message.success("Fee Paid");
      setConfirmLoading(false);
      setOpen(false);
      setEditModal(false);
    } else {
      message.error(data);
      setConfirmLoading(false);

      setDisabled(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const layout = {
    wrapperCol: {
      span: 10,
    },
    labelCol: {
      span: 14,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 7, span: 16 },
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Failed:", errorInfo);
  };
  const onValuesChange = (values, allValues) => {
    console.log("VALUES:", formRef?.current?.getFieldsValue());

    setFormValues((prev) => ({
      balance: { ...allValues.balance },
    }));
  };
  return (
    <div>
      <Row gutter={16} justify="center">
        <h2>Fee Balance</h2>
      </Row>
      <Form
        {...layout}
        name="basic"
        ref={formRef}
        onValuesChange={onValuesChange}
        onFinishFailed={onFinishFailed}
        justify="center"
        initialValues={initialValues}
        preserve={false}
      >
        <Form.Item
          label="Annual Fee"
          name={["balance", "annualFee"]}
          rules={[
            {
              required: true,
              message: "Please input Annual Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber
            placeholder="Annual Fee"
            type="number"
            max={initialValues?.balance?.annualFee}
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="School Fee"
          name={["balance", "schoolFee"]}
          rules={[
            {
              required: true,
              message: "Please input School Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber
            placeholder="School Fee"
            type="number"
            max={initialValues?.balance?.schoolFee}
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="Syllabus Fee"
          name={["balance", "syllabusFee"]}
          rules={[
            {
              required: true,
              message: "Please input Syllabus Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber
            placeholder="Syllabus Fee"
            type="number"
            max={initialValues?.balance?.syllabusFee}
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="Registration Fee"
          name={["balance", "registrationFee"]}
          rules={[
            {
              required: true,
              message: "Please input Registration Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
          max={initialValues?.balance?.registrationFee}
          min={0}
        >
          <InputNumber
            placeholder="Registration Fee"
            type="number"
            max={initialValues?.balance?.registrationFee}
            min={0}
          />
        </Form.Item>
        <Form.Item
          label="Late Fine"
          name={["balance", "lateFine"]}
          rules={[
            {
              required: true,
              message: "Please input Late Fee!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber placeholder="Late Fine" type="number" disabled={true} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
            onClick={downloadChallan}
          >
            Download Challan
          </Button>

          <Popconfirm
            title="Are you sure you want to Pay?"
            description="Student Fee Payment"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
              loading: confirmLoading,
            }}
            onCancel={handleCancel}
          >
            <Button type="danger" onClick={showPopconfirm}>
              Pay Fee
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          values={formValues}
          personalData={initialValues}
          ref={componentRef}
        />
      </div>
    </div>
  );
}
