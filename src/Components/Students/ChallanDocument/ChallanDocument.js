import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";
import "./styles.css";
import { initializeConnect } from "react-redux/es/components/connect";
const ComponentToPrint = React.forwardRef((props, ref) => {
  const { personalData, fee, values, discountFee } = props;
  let dataIsArray = Array.isArray(personalData);
  let payableAmount = 0;
  return (
    <>
      {dataIsArray ? (
        <div ref={ref} className="container">
          {personalData.map((obj, index) => (
            <div className="main">
              {(payableAmount = 0)}
              {Object.keys(obj?.studentData?.balance).forEach((key) => {
                console.log(
                  "key: ",
                  key,
                  "value: ",
                  obj?.studentData?.balance[key]
                );
                payableAmount = payableAmount + obj?.studentData?.balance[key];
              })}
              {/* set payabeleAmount for every student here */}
              {/* use foreach with balance obj to get all the sum */}

              {/* {let payableAmount = obj?.studentData?.balance?.reduce((accumulator, value) =>  accumulator + parseInt(value))} */}
              <div className="innnerDiv">
                <div className="heading">
                  <h1 className="headingText">
                    SUBLIME {personalData?.enrolledIn?.toUpperCase()}
                  </h1>
                </div>
                <div className="details">
                  <Descriptions bordered size="default" title="Student Info">
                    <Descriptions.Item label="Name" span={4}>
                      <u>{obj?.studentData?.name}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Father Name" span={4}>
                      <u>{obj?.studentData?.fatherName}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Class">
                      <u>{obj?.studentData?.classNo?.toUpperCase()}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Roll No">
                      <u>{obj?.studentData?.rollNo}</u>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="feeDetails">
                  <Descriptions bordered size="default" title="Fee">
                    <Descriptions.Item label="Tution Fee" span={2}>
                      <u>{obj?.studentData?.balance?.tutionFee}</u>
                    </Descriptions.Item>
                    {/* check point to check weather school or academy*/}
                    {obj?.studentData?.enrolledIn === "school" ? (
                      <>
                        <Descriptions.Item label="Syllabus Fee" span={2}>
                          <u>{obj?.studentData?.balance?.syllabusFee}</u>
                        </Descriptions.Item>
                        <Descriptions.Item label="Annual Fee" span={2}>
                          <u>{obj?.studentData?.balance?.annualFee}</u>
                        </Descriptions.Item>
                        <Descriptions.Item label="Registration Fee" span={2}>
                          <u>{obj?.studentData?.balance?.registrationFee}</u>
                        </Descriptions.Item>
                      </>
                    ) : (
                      <>
                        <Descriptions.Item label="Test Session Fee" span={2}>
                          <u>{obj?.studentData?.balance?.testSessionFee}</u>
                        </Descriptions.Item>
                        <Descriptions.Item label="Notes Balance" span={2}>
                          <u>{obj?.studentData?.balance?.notesBalance}</u>
                        </Descriptions.Item>
                      </>
                    )}
                    <Descriptions.Item label="Late Fine" span={2}>
                      <u>{obj?.studentData?.balance?.lateFine}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Discount" span={2}>
                      <u>{discountFee}</u>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="footerDescription">
                  <h2>
                    <strong>Payable Amount: {payableAmount}/PKR</strong>
                  </h2>

                  <h2>Balance: 0/PKR</h2>
                  <h2>Date: {new Date().toISOString().slice(0, 10)}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
                {/* <Descriptions.Item label="Batch">
              {personalData?.batch}
            </Descriptions.Item> */}
              </Descriptions>
            </div>
            <div className="feeDetails">
              <Descriptions bordered size="default" title="Fee">
                <Descriptions.Item label="Tution Fee" span={2}>
                  <u>{values?.balance?.tutionFee}</u>
                </Descriptions.Item>
                {/* check point to check weather school or academy*/}
                {personalData?.enrolledIn === "school" ? (
                  <>
                    <Descriptions.Item label="Syllabus Fee" span={2}>
                      <u>{values?.balance?.syllabusFee}</u>
                      {/* {console.log("SyllabusFee: ", values?.balance?.syllabusFee)}
                  {console.log( "On PersonalDATA SyllabusFee: ",personalData?.balance?.syllabusFee)} */}
                    </Descriptions.Item>
                    <Descriptions.Item label="Annual Fee" span={2}>
                      <u>{values?.balance?.annualFee}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Registration Fee" span={2}>
                      <u>{values?.balance?.registrationFee}</u>
                    </Descriptions.Item>
                  </>
                ) : (
                  <>
                    <Descriptions.Item label="Test Session Fee" span={2}>
                      <u>{values?.balance?.testSessionFee}</u>
                    </Descriptions.Item>
                    <Descriptions.Item label="Notes Balance" span={2}>
                      <u>{values?.balance?.notesBalance}</u>
                    </Descriptions.Item>
                  </>
                )}
                <Descriptions.Item label="Late Fine" span={2}>
                  <u>{values?.balance?.lateFine}</u>
                </Descriptions.Item>
                <Descriptions.Item label="Discount" span={2}>
                  <u>{discountFee}</u>
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
      )}
    </>
  );
});

export default ComponentToPrint;
