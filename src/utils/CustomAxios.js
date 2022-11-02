import axios from "axios";
import React from "react";

export const CustomAxios = axios.create({ baseURL: "http://localhost:3031/" });
