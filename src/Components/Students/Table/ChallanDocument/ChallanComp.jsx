import React, { useState, useRef, useEffect } from "react";
import { Row, InputNumber, Button, Form } from "antd";
import { message, Popconfirm } from "antd";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./ChallanDocument";
import { payStudentFeeReq } from "../../../../redux/actions/student-actions";

export default function ChallanComp({
  initialValues,
  setEditModal,
  payStudentFee
}) {
  const formRef = useRef(null);
  const componentRef = useRef();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [discountData, setDiscountData] = useState(0);
  const [formValues, setFormValues] = useState({
    balance: { ...initialValues?.balance }
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [fee, setFee] = useState({
    payableAmount: 0,
    balance: 0
  });
  const [initBalance, setInitBalance] = useState(0);
  const computeSum = bal => {
    const valuesCurrent = Object.values(bal);
    return valuesCurrent.reduce((accumulator, value) => {
      return accumulator + parseInt(value);
    });
  };
  const computeFee = bal => {
    let payableAmount = computeSum(bal);
    payableAmount = payableAmount - bal?.discountFee * 2;
    const balance = initBalance - payableAmount - bal?.discountFee;
    setFee({ balance, payableAmount });
    return { balance, payableAmount };
  };
  useEffect(() => {
    const init = computeSum(initialValues?.balance);
    if (init === 0 || isNaN(init)) setBtnDisabled(true);
    setInitBalance(init);
    setFee({ balance: 0, payableAmount: init });
  }, [initialValues]);

  const downloadChallan = useReactToPrint({
    content: () => componentRef.current
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
      _id: initialValues._id
    });
    if (data?.data?.status === "success") {
      payStudentFee(data?.data);
      message.success("Fee Paid");
      setEditModal(false);
    } else {
      message.error(data);
      setConfirmLoading(false);
      setDisabled(false);
    }
  };

  const layout = {
    wrapperCol: {
      span: 10
    },
    labelCol: {
      span: 14
    }
  };
  const tailLayout = {
    wrapperCol: { offset: 7, span: 16 }
  };

  const onFinishFailed = errorInfo => {
    message.error("Failed:", errorInfo);
  };
  const onValuesChange = (values, allValues) => {
    setFormValues(prev => ({
      balance: { ...allValues.balance }
    }));

    const { balance, payableAmount } = computeFee(allValues?.balance);
    if (
      (balance <= 0 && payableAmount <= 0) ||
      isNaN(balance) ||
      isNaN(payableAmount)
    )
      setBtnDisabled(true);
    else setBtnDisabled(false);

    setDiscountData(allValues?.balance?.discountFee);
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
          label="Tution Fee"
          name={["balance", "tutionFee"]}
          rules={[
            {
              required: true,
              message: "Please input School Fee!"
            }
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber
            placeholder="Tution Fee"
            type="number"
            max={initialValues?.balance?.tutionFee}
            min={0}
          />
        </Form.Item>

        {initialValues?.enrolledIn === "school" ? (
          <>
            <Form.Item
              label="Annual Fee"
              name={["balance", "annualFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Annual Fee!"
                }
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
              label="Syllabus Fee"
              name={["balance", "syllabusFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Syllabus Fee!"
                }
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <InputNumber
                placeholder="Syllabus Fee"
                type="number"
                max={initialValues?.fee?.syllabusFee}
                min={0}
              />
            </Form.Item>
            <Form.Item
              label="Registration Fee"
              name={["balance", "registrationFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Registration Fee!"
                }
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <InputNumber
                placeholder="Registration Fee"
                type="number"
                max={initialValues?.balance?.registrationFee}
                min={0}
              />
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
              <InputNumber
                placeholder="Missalaneous Fee"
                type="number"
                min={0}
              />
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
              <InputNumber placeholder="Notes Fee" type="number" min={0} />
            </Form.Item>
            <Form.Item
              label="Test session Fee"
              name={["balance", "testSessionFee"]}
              rules={[
                {
                  required: true,
                  message: "Please input Test session Fee!"
                }
              ]}
              style={{ display: "inline-block", width: "calc(50%)" }}
            >
              <InputNumber
                placeholder="Test session Fee"
                type="number"
                // min={0}
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Late Fine"
          name={["balance", "lateFine"]}
          rules={[
            {
              required: true,
              message: "Please input Late Fee!"
            }
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber placeholder="Late Fine" type="number" disabled={true} />
        </Form.Item>
        <Form.Item
          label="Discount Fee"
          name={["balance", "discountFee"]}
          rules={[
            {
              required: true,
              message: "Please input Discount Fee!"
            }
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <InputNumber placeholder="Discount Fee" type="number" min={0} />
        </Form.Item>

        <p style={{ color: "balck" }}>
          Payable Amount: {fee?.payableAmount} /PKR
        </p>
        <p style={{ color: "balck" }}>Total Balance: {fee?.balance} /PKR</p>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "8px" }}
            onClick={downloadChallan}
            disabled={btnDisabled}
          >
            Download Challan
          </Button>

          <Popconfirm
            title="Are you sure you want to Pay?"
            description="Student Fee Payment"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
              loading: confirmLoading
            }}
            onCancel={() => setOpen(false)}
          >
            <Button
              type="danger"
              onClick={showPopconfirm}
              disabled={btnDisabled}
            >
              Pay Fee
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          values={formValues}
          personalData={initialValues}
          fee={fee}
          ref={componentRef}
          discountFee={discountData}
        />
      </div>
    </div>
  );
}
