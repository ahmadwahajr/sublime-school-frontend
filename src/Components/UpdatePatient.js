import React, { useState } from "react";
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
import moment from "moment";
const { Search } = Input;
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
export default function UpdatePatient() {
  const [doctorsData, setDoctorsData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [showAdmitInfo, setshowAdmitInfo] = useState(false);
  const [radioValue, setRadioValue] = useState(2);
  const [form] = Form.useForm();

  const wardChange = e => {
    setRadioValue(e.target.value);
  };
  const onSearch = e => {
    if (e.length > 0) {
      axios.get(`${fetchUrl}/getPatientsData/${e}`).then(patient => {
        if (patient.data.length > 0 && patient.data[0].Admitdate) {
          setshowAdmitInfo(true);
        } else {
          setshowAdmitInfo(false);
        }
        if (patient.data.length > 0) {
          axios.get(`${fetchUrl}/getDoctorsData`).then(res => {
            setDoctorsData(res.data);
            form.setFieldsValue({
              Fname: patient.data[0].Fname,
              Lname: patient.data[0].Lname,
              contact: patient.data[0].contact,
              address: patient.data[0].address,
              disease: patient.data[0].disease,
              ward: patient.data[0].general_ward_id ? 1 : 2,
              discharge: patient.data[0].Admitdate ? true : false,
              admitDate: moment(patient.data[0].Admitdate, "YYYY-MM-DD"),
              bed_no: patient.data[0].bed_no,
              generalWardID: patient.data[0].general_ward_id,
              privateWardId: patient.data[0].private_ward_id,
              did: patient.data[0].Did,
            });
            patient.data[0].general_ward_id
              ? setRadioValue(1)
              : setRadioValue(2);
            patient.data[0].Admitdate
              ? setshowAdmitInfo(true)
              : setshowAdmitInfo(false);
          });
        }
        setPatientData(patient.data);
      });
    }
  };
  const switchChange = () => {
    setshowAdmitInfo(!showAdmitInfo);
  };

  const onValuesChange = () => {
    setUpdated(true);
  };
  const onFinish = values => {
    if (updated) {
      formData = { ...formData, ...values, Pid: patientData[0].Pid };
      if (typeof formData.admitDate !== "undefined")
        formData.admitDate = formData.admitDate.toDate().toISOString();

      axios({
        method: "post",
        url: `${fetchUrl}/updatePatientsData/`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          ...formData,
        }),
      })
        .then((req, res) => {
          message.success("Patient Updated");
        })
        .catch(err => {
          message.error("Failed: Check your Data carefully(ward id or bed_no)");
        });
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
          placeholder="Enter Patient ID"
          onSearch={onSearch}
          loading={false}
          style={{ width: 200 }}
        />
      </Row>

      {patientData.length === 0 ? (
        <Row justify="center">No Record</Row>
      ) : (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 22 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
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
            <Switch checked={showAdmitInfo} onChange={switchChange} />
          </Form.Item>
          {showAdmitInfo && patientData.length > 0 ? (
            <>
              <Form.Item name="ward">
                <Radio.Group
                  onChange={wardChange}
                  value={patientData[0].general_ward_id ? 1 : 2}
                >
                  <Radio value={1}>General Ward</Radio>
                  <Radio value={2}>Private Ward</Radio>
                </Radio.Group>
              </Form.Item>
              {radioValue === 1 ? (
                <>
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
                    initialValue={patientData[0].private_ward_id}
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
      )}
    </div>
  );
}
