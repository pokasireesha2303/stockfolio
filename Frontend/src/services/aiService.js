import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://stockfolio-lv50.onrender.com/api/ai';

const authHeader = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getPortfolioInsights = async (stocks) => {
  const response = await axios.post(`${API_URL}/insights`, { stocks }, authHeader());
  return response.data;
};