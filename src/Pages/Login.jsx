import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { login } from "../redux/actions/user-actions";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state?.loggedInUser);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
  useEffect(() => {
    if (loggedInUser?.userInfo?.status === "success") {
      navigate("/");
      setDisabled(false);
      setLoading(false);
    } else if (loggedInUser?.error) {
      message?.error("Username or password does not exist");
      setDisabled(false);
      setLoading(false);
    }
  }, [loggedInUser, navigate]);
  const onFinish = values => {
    setDisabled(true);
    setLoading(true);
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
                disabled={disabled}
              >
                Log in {loading && <Spin indicator={antIcon} />}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Login;
