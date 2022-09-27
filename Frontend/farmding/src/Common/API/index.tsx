import axios from "axios";

let URL = "";
if (window.location.hostname === "localhost") {
  URL = `http://localhost:8080/api`;
} else {
  URL = `http://${window.location.hostname}/api`;
}

export default function apiInstance() {
  const instance = axios.create({
    baseURL: URL,
    timeout: 30000,
    headers: {
      "Content-type": "application/json;charset=UTF-8",
    },
  });
  return instance;
}
