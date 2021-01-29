import React, { useState, useEffect } from "react";
import { notification, Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import "./index.css";

export default function UpdateProfile({ onLoading, onCancel }) {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: currentUser.email,
    });
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    const promises = [];
    if (values.email !== currentUser.email) {
      promises.push(updateEmail(values.email));
    }
    if (values.email) {
      promises.push(updatePassword(values.password));
    }

    Promise.all(promises)
      .then(() => {})
      .catch((error) => {
        notification.error({
          message: "Error",
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
    onLoading();
    form.resetFields();
  };

  return (
    <Form
      name="password_change"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className="changing-form"
      form={form}
      style={{ width: 350 }}
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
          disabled
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
            marginTop: 20,
          }}
          disabled={loading}
          loading={loading}
          htmlType="submit"
          className="login-input"
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
}
