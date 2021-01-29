import React, { useState } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { ReactComponent as ArrowLeftSVG } from "../../../assets/arrow-left.svg";
import "./index.css";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await resetPassword(values.email);
      history.push("/");
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
        <Link to="/login">
          <ArrowLeftSVG width={20} color={"#190e2fcc"} />
        </Link>
        <h3 className="reset-header" style={{ color: "#190e2fcc" }}>
          Reset Password
        </h3>
        <Form
          name="reset_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="reset-form"
        >
          <p className="form-info">
            Enter your email address below and we'll send you a link to reset
            your password
          </p>
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
              className="reset-input"
              prefix={<MailOutlined />}
              placeholder="Mail"
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
              className="reset-input"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
}
