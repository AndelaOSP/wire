import axios from 'axios';

const token = localStorage.getItem('token');
export const http = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { Authorization: `Bearer ${token}`, }
});
