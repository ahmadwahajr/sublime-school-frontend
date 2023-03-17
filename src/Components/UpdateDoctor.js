import React, { useState } from "react";
import fetchUrl from "../fetchURL";
import axios from "axios";
import qs from "qs";
import { Row, Input, Button, Form, Select, DatePicker, message } from "antd";
import moment from "moment";
const { Search } = Input;
export default function UpdateDoctor() {
  const [departmentsData, setdepartmentsData] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [form] = Form.useForm();

  const onSearch = e => {
    if (e.length > 0) {
      axios.get(`${fetchUrl}/getDoctorsData/${e}`).then(doctor => {
        setDoctorData(doctor.data);
        if (doctor.data.length > 0) {
          axios.get(`${fetchUrl}/getDepartmentData`).then(res => {
            setdepartmentsData(res.data);
            form.setFieldsValue({
              Fname: doctor.data[0].Fname,
              Lname: doctor.data[0].Lname,
              address: doctor.data[0].address,
              pay: doctor.data[0].pay,
              contact: doctor.data[0].contact,
              Deptid: doctor.data[0].DeptId,
              joinDate: moment(
                doctor.data[0].joindate.slice(0, 10),
                "YYYY-MM-DD"
              ),
            });
          });
        }
      });
    }
  };

  const onValuesChange = () => {
    setUpdated(true);
  };
  const onFinish = values => {
    if (updated) {
      axios({
        method: "post",
        url: `${fetchUrl}/updateDoctorsData/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          ...values,
          joinDate: values.joinDate.toDate().toISOString(),
          did: doctorData[0].Did,
        }),
      })
        .then((req, res) => {
          message.success("Doctor Data Updated");
        })
        .catch(err => message.error("Internal Error Happend"));
    } else {
      message.error("Please Change any value to update");
    }
  };

  const onFinishFailed = errorInfo => {
    message.error("Failed:", errorInfo);
  };
  return (
    <div>
      <Row gutter={16} justify="center">
        <h2>Update Data</h2>
      </Row>
      <Row gutter={16} justify="center" style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Enter Doctor ID"
          onSearch={onSearch}
          loading={false}
          style={{ width: 200 }}
        />
      </Row>

      {doctorData.length === 0 ? (
        <></>
      ) : (
        <Form
          name="basic"
          wrapperCol={{ span: 22 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          justify="center"
          form={form}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label=""
            name="Fname"
            rules={[
              { required: true, message: "Please input your FirstName!" },
            ]}
            style={{ display: "inline-block", width: "calc(50%)" }}
          >
            <Input name="fname" placeholder="First Name" />
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
            name="pay"
            rules={[
              {
                required: true,
                message: "Please input your Pay!",
              },
            ]}
            style={{ display: "inline-block", width: "calc(50%)" }}
          >
            <Input name="pay" placeholder="Pay" />
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
            name="Deptid"
            style={{ display: "inline-block", width: "calc(50%)" }}
            rules={[{ required: true, message: "Province is required" }]}
          >
            <Select placeholder="Department">
              {departmentsData.map((data, index) => (
                <Select.Option key={data.Deptid} value={data.Deptid}>
                  {data.depName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="joinDate"
            style={{ display: "inline-block", width: "calc(50%)" }}
            rules={[{ required: true, message: "Join Date is required" }]}
          >
            <DatePicker placeholder="Join Date" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
