import API from "./api";

export const applyJob = async (jobId, applicationData) => {
  const response = await API.post(`applications/apply/${jobId}/`, applicationData);
  return response.data;
};

export const getMyApplications = async () => {
  const response = await API.get("applications/my/");
  return response.data;
};

export const withdrawApplication = async (applicationId) => {
  const response = await API.delete(`applications/${applicationId}/withdraw/`);
  return response.data;
};

export const getJobApplicants = async (jobId) => {
  const response = await API.get(`applications/job/${jobId}/`);
  return response.data;
};

export const getAllApplicants = async () => {
  const response = await API.get("applications/all/");
  return response.data;
};

export const updateApplicantStatus = async (applicationId, statusData) => {
  const response = await API.put(`applications/${applicationId}/status/`, statusData);
  return response.data;
};
