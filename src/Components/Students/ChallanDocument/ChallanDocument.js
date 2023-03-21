import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import "./styles.css";
const ComponentToPrint = React.forwardRef((props, ref) => {
  const { personalData, values } = props;
  const [fee, setFee] = useState({
    payableAmount: 0,
    balance: 0,
  });

  useEffect(() => {
    console.log("IN USE EFFECT : ", personalData, values);
    const initValues = Object.values(personalData?.balance);
    const initBalance = initValues.reduce((accumulator, value) => {
      return accumulator + parseInt(value);
    });
    const valuesCurrent = Object.values(values?.balance);
    const payableAmount = valuesCurrent.reduce((accumulator, value) => {
      return accumulator + parseInt(value);
    });

    const balance = initBalance - payableAmount;
    setFee({ balance, payableAmount });
  }, [values]);

  return (
    <div ref={ref} className="main">
      <div className="innnerDiv">
        <div className="heading">
          <h1 className="headingText">
            SUBLIME {personalData?.enrolledIn?.toUpperCase()}
          </h1>
        </div>
        <div className="details">
          <Descriptions bordered size="default" title="Student Info">
            <Descriptions.Item label="Name" span={4}>
              <u>{personalData?.name}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Father Name" span={4}>
              <u>{personalData?.fatherName}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              <u>{personalData?.classNo?.toUpperCase()}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Roll No">
              <u>{personalData?.rollNo}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Batch">
              {personalData?.batch}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="feeDetails">
          <Descriptions bordered size="default" title="Fee">
            <Descriptions.Item label="School Fee" span={2}>
              <u>{values?.balance?.schoolFee}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Syllabus Fee" span={2}>
              <u>{values?.balance?.syllabusFee}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Annual Fee" span={2}>
              <u>{values?.balance?.annualFee}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Registration Fee" span={2}>
              <u>{values?.balance?.registrationFee}</u>
            </Descriptions.Item>
            <Descriptions.Item label="Late Fine">
              <u>{values?.balance?.lateFine}</u>
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="footerDescription">
          <h2>
            <strong>Payable Amount: {fee?.payableAmount}/PKR</strong>
          </h2>

          <h2>Balance: {fee?.balance}/PKR</h2>
          <h2>Date: {new Date().toISOString().slice(0, 10)}</h2>
        </div>
      </div>
    </div>
  );
});

export default ComponentToPrint;
