import axios from "axios";
import { baseurl } from "./ApiEndpoints";

const AxiosConfig = axios.create({
  baseURL: baseurl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Endpoints that should NOT have Authorization header
const excludeEndpoints = ["/login", "/register", "/health", "/activate", "/status"];

AxiosConfig.interceptors.request.use(
  (config) => {
    const requestPath = config.url ? config.url.replace(baseurl, "") : "";

    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      requestPath.startsWith(endpoint)
    );

    if (!shouldSkipToken) {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        delete config.headers["Authorization"];
      }
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Internal Server Error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED" || error.message === "Network Error") {
      console.error("Network Error. Please check your internet connection.");
    } else {
      console.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);

export default AxiosConfig;
