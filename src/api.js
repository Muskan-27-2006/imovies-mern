import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Aapka backend URL
});

// Har API request ke saath automatically token add hoga
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;