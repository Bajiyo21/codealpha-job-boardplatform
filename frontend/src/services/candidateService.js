import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/auth/",
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get profile
export const getCandidateProfile = () =>
  API.get("candidate/profile/");

// Update profile
export const updateCandidateProfile = (data) =>
  API.put("candidate/profile/update/", data);