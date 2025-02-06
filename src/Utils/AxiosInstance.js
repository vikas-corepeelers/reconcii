import axios from "axios";
import API_END_POINTS from "../ServiceRequest/APIEndPoints";
const instance = axios.create({
  baseURL: API_END_POINTS.baseURL,
  responseType: "json",
  timeout: 60000,
  headers: {
    langId: 1,
    Accept: "application/json",
  },
});

export const handleError = ({ message, data, status }) => {
  return Promise.reject({ message, data, status });
};

// Intercept request to set dynamic baseURL
instance.interceptors.request.use((config) => {
  // If a specific baseURL is passed, use it; otherwise, default to the instance's baseURL
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status });
  }
);

export default instance;
