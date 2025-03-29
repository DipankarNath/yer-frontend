import axios from "axios";

const api = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "content-type": "text/javascript" },
});

export default api;
