import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../redux/actions/user-actions";
const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state?.loggedInUser);

  useEffect(() => {
    console.log(userInfo);
    if (userInfo?.status === "success") {
      navigate("/");
    }
  }, [userInfo]);
  const onFinish = values => {
    console.log(values);
    dispatch(login({ ...values }));
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9"
      }}
    >
      <div
        style={{
          height: "250px",
          width: "400px",
          backgroundColor: "#d1d1d1"
        }}
      >
        <Card
          title="Login"
          bordered={true}
          style={{
            width: 400,
            height: 250
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Login;
