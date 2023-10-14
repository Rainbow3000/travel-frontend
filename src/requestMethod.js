import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/";

const publicRequest = axios.create({
  baseURL: baseURL,
});
const userRequest = axios.create({
  baseURL: baseURL,
});

export { publicRequest, userRequest };
