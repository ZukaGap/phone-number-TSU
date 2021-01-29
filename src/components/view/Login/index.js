import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { ReactComponent as FacebookSVG } from "../../../assets/facebook.svg";
import { ReactComponent as GoogleSVG } from "../../../assets/google.svg";
import "./index.css";

export default function Login() {
  const { login, googleAuth, facebookAuth } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      history.push("/");
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      googleAuth()
        .then(() => history.push("/"))
        .catch((err) => console.log(err));
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const handleFacebook = (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      facebookAuth()
        .then(() => history.push("/"))
        .catch((err) => console.log(err));
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <section className="fill-height center">
      <Card style={{ width: 350, borderRadius: 12 }}>
        <h3 className="login-header">Members Log In</h3>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              className="login-input"
              prefix={<MailOutlined />}
              placeholder="Mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              style={{}}
              className="login-input"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              style={{
                width: "100%",
                height: 44,
                backgroundColor: "#7fd4f0",
                border: "none",
              }}
              disabled={loading}
              loading={loading}
              htmlType="submit"
              className="login-input"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="span">
          <span>Or sign in with</span>
        </div>
        <div className="social-login">
          <Button onClick={handleFacebook}>
            <FacebookSVG />
          </Button>
          <Button onClick={handleGoogle}>
            <GoogleSVG />
          </Button>
        </div>
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="reset-link">
          Forgot Password? <Link to="/forgot-password">Reset</Link>
        </p>
      </Card>
    </section>
  );
}
