import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./components/Route/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
