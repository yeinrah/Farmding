import axios from "axios";
const accessToken: any = localStorage.getItem("access-token");
let URL = "";
if (window.location.hostname === "localhost") {
  URL = `http://localhost:8080/api`;
} else {
  URL = `http://${window.location.hostname}/api`;
}
const fundingProjectsApi = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "access-token": accessToken,
  },
});
export default fundingProjectsApi;
