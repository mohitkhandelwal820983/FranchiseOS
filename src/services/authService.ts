import { authAPI } from '../api/auth.api';
import * as storageService from './storageService';

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await authAPI.login({ email, password });
      await storageService.setItem('authToken', response.data.token);
      await storageService.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await authAPI.logout();
      await storageService.removeItem('authToken');
      await storageService.removeItem('user');
    } catch (error) {
      throw error;
    }
  },

  async getToken() {
    return await storageService.getItem('authToken');
  },

  async getUser() {
    const user = await storageService.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  },
};
