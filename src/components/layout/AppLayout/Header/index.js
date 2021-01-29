import React from "react";
import { Layout, Row, Col } from "antd";
import ProfileIcon from "../../../Shared/ProfileIcon";
import "./index.css";
import Logo from "../../../Shared/Logo/index";

export default function Header(props) {
  return (
    <Layout.Header color="#fff" className="main-header">
      <Row type="flex" justify="space-between" gutter={[16, 0]}>
        <Col>
          <Logo size="medium" color="blue" />
        </Col>
        {!props.login && (
          <Col>
            <ProfileIcon />
          </Col>
        )}
      </Row>
    </Layout.Header>
  );
}
