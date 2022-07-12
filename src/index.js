import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Cấu hình redux
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
// import css antd
import "antd/dist/antd.css";
// React-Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// React Swiper

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
