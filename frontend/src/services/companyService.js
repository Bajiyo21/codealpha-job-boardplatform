import API from "./api";

export const getCompanies = async (params = {}) => {
  const response = await API.get("company/", { params });
  return response.data;
};

export const getCompanyById = async (id) => {
  const response = await API.get(`company/${id}/`);
  return response.data;
};

export const getMyCompany = async () => {
  const response = await API.get("company/me/");
  return response.data;
};

export const updateMyCompany = async (formData) => {
  const response = await API.put("company/update/", formData);
  return response.data;
};
