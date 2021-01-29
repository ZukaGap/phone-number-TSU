import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { ReactComponent as FacebookSVG } from "../../../assets/facebook.svg";
import { ReactComponent as GoogleSVG } from "../../../assets/google.svg";
import "./index.css";

export default function Signup() {
  const { signup, googleAuth, facebookAuth } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await signup(values.email, values.password);
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
        <h3 className="login-header">Members Sign Up</h3>
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
              className="login-input"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="login-input"
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
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
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div className="span">
          <span>Or sign up with</span>
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
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        <p className="reset-link">
          Forgot Password? <Link to="/forgot-password">Reset</Link>
        </p>
      </Card>
    </section>
  );
}
