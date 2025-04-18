import axios from "axios";
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: "http://172.20.10.6:5000/api/",
  timeout: 1000,
  headers: { "content-type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

     const refreshToken = localStorage.getItem("refreshToken");
      // const refreshToken = Cookies.get('refresh_token')

      if (
        !refreshToken ||
        typeof refreshToken !== "string" ||
        refreshToken === ""
      ) {
        return Promise.reject(new Error(`Token not found!`));
      }
      //TODO: implement api for refresh token
      try {
        const response = await api.post("/refresh-token", {
          token: refreshToken,
        });
        const { accessToken } = response.data;

        localStorage.setItem("token", accessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
        // localStorage.clear();
        // window.location.href = `${window.location.protocol}//${window.location.hostname}/login`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
