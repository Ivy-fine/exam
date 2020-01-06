import axios from "axios";

const request = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/api" : ""
});
request.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.authorization = token;
  return config;
});
request.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  err => {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/#/login";
    }
    return Promise.reject(err);
  }
);
export default {
  get: (url, params) => request.get(url, { params }),
  post: (url, params) => request.post(url, params),
  put: (url, params) => request.put(url, params),
  delete: (url, params) => request.delete(url, { data: params })
};
