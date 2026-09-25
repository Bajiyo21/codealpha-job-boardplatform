import API from "./api";

export const getNotifications = async () => {
  const response = await API.get("core/notifications/");
  return response.data;
};

export const markNotificationsRead = async (id = null) => {
  if (id) {
    const response = await API.post(`core/notifications/${id}/mark-read/`);
    return response.data;
  }
  const response = await API.post("core/notifications/mark-read/");
  return response.data;
};

export const getAIRecommendations = async () => {
  const response = await API.get("core/ai/recommendations/");
  return response.data;
};

export const getAISkillGap = async (jobId) => {
  const response = await API.get(`core/ai/skill-gap/${jobId}/`);
  return response.data;
};

export const getAIMatchScore = async (jobId, candidateId) => {
  const response = await API.get(`core/ai/match-score/${jobId}/${candidateId}/`);
  return response.data;
};

export const sendContactMessage = async (messageData) => {
  const response = await API.post("core/contact/", messageData);
  return response.data;
};
