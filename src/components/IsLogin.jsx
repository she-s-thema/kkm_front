import React from "react";
import { Home } from "../pages/home";

export const IsLogin = () => {
  if (localStorage.getItem("token") !== null) {
    return <Home />;
  } else {
    window.location.href = "/login";
    return <></>;
  }
};
