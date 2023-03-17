import React, { useState, useEffect } from "react";
import fetchUrl from "../fetchURL";
import axios from "axios";
import qs from "qs";
import {
  Row,
  Input,
  Button,
  Form,
  Select,
  DatePicker,
  message,
  Switch,
  Radio,
} from "antd";

export default function InsertPatients() {
  const [doctorsData, setDoctorsData] = useState([]);
  const [showAdmitInfo, setshowAdmitInfo] = useState(false);
  const [radioValue, setRadioValue] = useState(1);
  let formData = {
    Fname: "",
    Lname: "",
    address: "",
    contact: "",
    did: "",
    discharge: "",
    disease: "2",
    admitDate: undefined,
    privateWardId: "",
    generalWardID: "",
    bed_no: 0,
  };

  useEffect(() => {
    axios.get(`${fetchUrl}/getDoctorsData`).then(res => {
      setDoctorsData(res.data);
    });
  }, []);
  const wardChange = e => {
    setRadioValue(e.target.value);
  };
  const onFinish = values => {
    formData = { ...formData, ...values };
    if (typeof formData.admitDate !== "undefined")
      formData.admitDate = formData.admitDate.toDate().toISOString();

    axios({
      method: "post",
      url: `${fetchUrl}/insertPatientsData/`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...formData,
      }),
    })
      .then((req, res) => {
        message.success("Patient Added");
      })
      .catch(err => {
        message.error("Failed: Check your Data carefully(ward id or bed_no)");
      });
  };

  const onFinishFailed = errorInfo => {
    message.error("Failed: ", errorInfo);
  };
  return (
    <div>
      <Row gutter={16} justify="center">
        <h2>Insert Data</h2>
      </Row>
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        justify="center"
      >
        <Form.Item
          label=""
          name="Fname"
          rules={[
            {
              required: true,
              message: "Please input your FirstName!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="fname" placeholder="First Name" value="ahmad" />
        </Form.Item>

        <Form.Item
          label=""
          name="Lname"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="lname" placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          label=""
          name="contact"
          rules={[
            {
              required: true,
              message: "Please input your Contact!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="contact" placeholder="Contact" />
        </Form.Item>
        <Form.Item
          label=""
          name="disease"
          rules={[
            {
              required: true,
              message: "Please input your Disease!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="disease" placeholder="Disease" />
        </Form.Item>
        <Form.Item
          label=""
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your Address!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50%)" }}
        >
          <Input name="address" placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="did"
          style={{ display: "inline-block", width: "calc(50%)" }}
          rules={[{ required: true, message: "Province is required" }]}
        >
          <Select placeholder="Doctor">
            {doctorsData.map((data, index) => (
              <Select.Option key={data.key} value={data.key}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="discharge" label="Admit: ">
          <Switch onChange={() => setshowAdmitInfo(!showAdmitInfo)} />
        </Form.Item>
        {showAdmitInfo ? (
          <>
            <Form.Item>
              <Radio.Group onChange={wardChange} value={radioValue}>
                <Radio value={1}>General Ward</Radio>
                <Radio value={2}>Private Ward</Radio>
              </Radio.Group>
            </Form.Item>
            {radioValue === 1 ? (
              <>
                {" "}
                <Form.Item
                  label=""
                  name="generalWardID"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Ward ID!",
                    },
                  ]}
                  style={{ display: "inline-block", width: "calc(50%)" }}
                >
                  <Input name="WardID" placeholder="Ward ID" />
                </Form.Item>
                <Form.Item
                  label=""
                  name="bed_no"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Bed NO!",
                    },
                  ]}
                  style={{ display: "inline-block", width: "calc(50%)" }}
                >
                  <Input name="bedNo" placeholder="Bed No" />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  label=""
                  name="privateWardId"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Ward ID!",
                    },
                  ]}
                  style={{ display: "inline-block", width: "calc(50%)" }}
                >
                  <Input name="address" placeholder="Ward ID" />
                </Form.Item>
              </>
            )}

            <Form.Item
              name="admitDate"
              style={{ display: "inline-block", width: "calc(50%)" }}
              rules={[
                {
                  required: true,
                  message: "Please Select Date!",
                },
              ]}
            >
              <DatePicker placeholder="Admit Date" />
            </Form.Item>
          </>
        ) : (
          <></>
        )}

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
