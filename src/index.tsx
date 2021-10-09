import React from "react";
import ReactDOM from "react-dom";

import "./styles/layout.scss";
import "./styles/header.scss";
import "./styles/paginator.scss";
import "./styles/job-list.scss";
import "./styles/job-detail.scss";
import "./styles/media-query.scss";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

/* if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  require("./styles/layout-mobile.scss");
  console.log("mobile");
} else {
  require("./styles/layout.scss");
} */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
