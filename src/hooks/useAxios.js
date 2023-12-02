import axios from "axios";

export const axiosn = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:3000",
});
