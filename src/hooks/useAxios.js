import axios from "axios";

export const axiosn = axios.create({
  baseURL: import.meta.env.PROD ? "https://parcelbee-shanto-noors-projects.vercel.app" : "http://localhost:3000",
});
