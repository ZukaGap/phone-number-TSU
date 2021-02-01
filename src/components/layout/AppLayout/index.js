import React from "react";
import { Layout } from "antd";
import Header from "./Header/index";
import "./index.css";

const { Content } = Layout;

export default function AppLayout({ children }) {
  return (
    <Layout style={{ height: "100vh" }} id="app-layout" className="app-layout">
      <Header />
      <Content className="content-holder" fluid>
        {children}
      </Content>
    </Layout>
  );
}
