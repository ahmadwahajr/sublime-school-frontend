import React from "react";
import axios from "axios";
import { Form, Input, Button, Row, message } from "antd";
import fetchUrl from "../fetchURL";
import qs from "qs";
function DeleteData({ deleteData }) {
  const onFinish = values => {
    axios({
      method: "post",
      url: `${fetchUrl}${deleteData.link}/`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        id: values.id,
      }),
    })
      .then(req => {
        if (req.data.affectedRows > 0) message.success("Data got Deleted");
        else message.error("ID not Found");
      })
      .catch(err => message.error("Internal Error Happend"));
  };

  const onFinishFailed = errorInfo => {
    message.error("Failed:", errorInfo);
  };

  return (
    <>
      <Row gutter={16} justify="center">
        <h2>Delete Data</h2>
      </Row>
      <Row gutter={16} justify="center">
        <h4>Enter ID to delete record.</h4>
      </Row>
      <Form
        name="Delete"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[{ required: true, message: "Please input your ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit" danger>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default DeleteData;
