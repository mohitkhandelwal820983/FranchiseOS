import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_CONFIG} from './config';
import {clearAuthStorage} from '../utils/sessionManager';
import {
  isLoginRouteActive,
  resetToLogin,
} from '../navigation/navigationService';

export const apiClient = axios.create({
  baseURL: API_CONFIG.LIVE_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const token =
    (await AsyncStorage.getItem('authToken')) ||
    (await AsyncStorage.getItem('token'));

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error?.response?.status === 401) {
      await clearAuthStorage();

      if (!isLoginRouteActive()) {
        resetToLogin();
      }
    }

    return Promise.reject(error);
  },
);
