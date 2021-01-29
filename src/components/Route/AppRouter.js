import React from "react";
import { Container, Spinner } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import QueueAnim from "rc-queue-anim";
import Dashboard from "../../components/view/Dashboard/index";
import Login from "../../components/view/Login/index";
import PrivateRoute from "../../components/view/PrivateRoute";
import ForgotPassword from "../../components/view/ForgotPassword/index";
import Signup from "../../components/view/Signup/index";
import "./index.css";

export default function AppRouter() {
  return (
    <QueueAnim
      className="content"
      key="demo"
      type={["right", "left"]}
      ease={["easeOutQuart", "easeInOutQuart"]}
      leaveReverse
    >
      {false ? (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      )}
    </QueueAnim>
  );
}
