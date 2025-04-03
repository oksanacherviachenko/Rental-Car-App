// src/services/api.js

import axios from 'axios';

// 🔐 Токен із документації API
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzQxYjNjZGY2MmRjYmQyOTgzNjU5MmNhNjM5ZGYwYiIsIm5iZiI6MTczMjEzNzg2NC4zMDM5ODM0LCJzdWIiOiI2NzNlNGRhZGFkZTkzMTBmM2ZkZjhhZGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.N4_rdsIonUz94o2X6ewclT-7n96up5IZkpJMN8HhwpQ';

const axiosInstance = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default axiosInstance;


