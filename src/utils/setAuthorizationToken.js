import axios from "axios";

// token이 있으면 header에 포함, 없으면 그 부분을 지움
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
