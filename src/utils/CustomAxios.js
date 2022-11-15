import axios from "axios";
import React from "react";

export const CustomAxios = axios.create({
  baseURL: "http://54.180.30.70:3031/",
});
