import axios from "axios";
import { AsyncStorage } from 'react-native';

const apiClient = axios.create({
  baseURL: 'http://172.20.10.9:8080/api',
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    return ({
      ...config,
      headers: token ? {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': token,
      } : {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(response =>
  response,
  async (error) => {
    const token = await AsyncStorage.getItem('token');
    if (error.response.status === 401 && !!token) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error.response.data);
  },
);

export default apiClient;