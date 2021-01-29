import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header/index";
import "./index.css";

export default function AppLayout({ children }) {
  return (
    <>
      <Container className="p-0" fluid>
        <Header></Header>
      </Container>
      <Container fluid>{children}</Container>
    </>
  );
}
