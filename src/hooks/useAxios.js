import axios from "axios";

export const axiosn = axios.create({
  baseURL: import.meta.env.PROD ? "https://backend-nine-zeta-50.vercel.app" : "http://localhost:3000",
});
