import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/stocks';

const authHeader = () => {
  const token = getToken();
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getStocks = async () => {
  const response = await axios.get(API_URL, authHeader());
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