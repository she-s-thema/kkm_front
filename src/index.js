import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.css";
import setAuthorizationToken from "./utils/setAuthorizationToken";

setAuthorizationToken(localStorage.getItem("token"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

reportWebVitals();
