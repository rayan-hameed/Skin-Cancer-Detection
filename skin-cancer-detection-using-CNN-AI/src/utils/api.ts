import axios from 'axios';
import { getAuthHeader } from './auth';

const API_URL = 'http://127.0.0.1:5000';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/predict`, formData, {
    headers: {
      ...getAuthHeader(),
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_URL}/history`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const sendDoctorMessage = async (predictionId: string, message: string) => {
  const response = await axios.post(
    `${API_URL}/send-message`,
    { prediction_id: predictionId, message },
    { headers: getAuthHeader() }
  );
  return response.data;
};