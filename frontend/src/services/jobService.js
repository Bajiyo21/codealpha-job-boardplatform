import API from "./api";

export const getJobs = async (params = {}) => {
  const response = await API.get("jobs/", { params });
  return response.data;
};

export const getJobById = async (id) => {
  const response = await API.get(`jobs/${id}/`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await API.post("jobs/create/", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await API.put(`jobs/${id}/update/`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`jobs/${id}/delete/`);
  return response.data;
};

export const getMyJobs = async () => {
  const response = await API.get("jobs/my/");
  return response.data;
};

export const toggleSaveJob = async (jobId) => {
  const response = await API.post(`jobs/${jobId}/save/`);
  return response.data;
};

export const getSavedJobs = async () => {
  const response = await API.get("jobs/saved/");
  return response.data;
};

export const getEmployerStats = async () => {
  const response = await API.get("jobs/dashboard/stats/");
  return response.data;
};