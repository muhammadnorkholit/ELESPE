import axios from "axios";

axios.defaults.withCredentials = true;
console.log(process.env.REACT_APP_API_URL);
const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default Api;
