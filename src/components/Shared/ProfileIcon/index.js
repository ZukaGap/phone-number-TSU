import React, { useState, useEffect } from "react";
import {
  Dropdown,
  Menu,
  Tooltip,
  Avatar,
  Skeleton,
  Row,
  Col,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Animate from "rc-animate";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import UpdateProfile from "../../Forms/UpdateProfile/index.js";
import "./index.css";

export default function ProfileIcon(props) {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser, logout } = useAuth();
  const email =
    currentUser.displayName !== null
      ? currentUser.displayName
      : currentUser.email;
  const avatar = currentUser.photoURL || null;

  useEffect(() => {
    email && setLoading(false);
  }, [email]);

  const menu = (
    <Menu className="inline-dropdown">
      <Menu.Item key="logout">
        <NavLink to={"#"} onClick={() => setIsModalVisible(true)}>
          Update Profile
        </NavLink>
        <NavLink to={"#"} onClick={async () => await logout()}>
          Log Out
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const avatarImage = avatar || null;
  const avatarName = email || null;

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row justify="center">
      <Col>
        <Skeleton
          avatar
          paragraph={false}
          title={false}
          loading={loading}
          active
          className="avatar-skeleton"
        >
          <Animate component="" transitionName="fade">
            {!loading ? (
              <Dropdown overlay={menu} trigger={["click"]}>
                <Tooltip
                  placement="left"
                  title={avatarName}
                  mouseEnterDelay={0.3}
                >
                  <Avatar
                    className="avatar-button"
                    shape="circle"
                    icon={<UserOutlined />}
                    size={props.size || 48}
                    src={avatarImage}
                    style={{ margin: props.margin || 0 }}
                  >
                    {avatarName}
                  </Avatar>
                </Tooltip>
              </Dropdown>
            ) : null}
          </Animate>
        </Skeleton>
      </Col>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={""}
        title={""}
        style={{ width: 350 }}
      >
        <UpdateProfile onLoading={handleOk} onCancel={handleCancel} />
      </Modal>
    </Row>
  );
}
