import axios from "axios";

const apiUserToken = "3ae08f9b9a648f458da07a7be4dfd24f640e3930";

const api = axios.create({
  baseURL: "https://api.logmeal.com/v2/",
  headers: {
    Authorization: `Bearer ${apiUserToken}`,
    "Content-Type": "application/json",
  },
});

export default api;
