import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

axios.interceptors.request.use(
  function (config) {
    let token = "";
    const localStorageUser = localStorage.getItem("user");

    if (localStorageUser) {
      token = JSON.parse(localStorageUser).token;
    }

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
