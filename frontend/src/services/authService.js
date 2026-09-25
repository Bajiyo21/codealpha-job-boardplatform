import API from "./api";

export const registerUser = async (userData) => {
  const response = await API.post("auth/register/", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("auth/login/", credentials);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get("auth/profile/");
  return response.data;
};

export const getCandidateProfile = async () => {
  const response = await API.get("auth/candidate/profile/");
  return response.data;
};

export const updateCandidateProfile = async (formData) => {
  const response = await API.put("auth/candidate/profile/update/", formData);
  return response.data;
};