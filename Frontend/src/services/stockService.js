import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://stockfolio-lv50.onrender.com/api/stocks';

const authHeader = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getStocks = async () => {
  const response = await axios.get(API_URL, authHeader());
  return response.data;
};

export const getLiveStocks = async () => {
  const response = await axios.get(`${API_URL}/live`, authHeader());
  return response.data;
};

export const searchSymbols = async (query) => {
  const response = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`, authHeader());
  return response.data;
};

export const addStock = async (stockData) => {
  const response = await axios.post(API_URL, stockData, authHeader());
  return response.data;
};

export const deleteStock = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, authHeader());
  return response.data;
};