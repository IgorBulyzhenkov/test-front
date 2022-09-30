import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/users";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};