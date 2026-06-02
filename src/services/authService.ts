import { authAPI } from '../api/auth.api';
import * as storageService from './storageService';

const getUserData = (response: any) => response?.data || response?.user || response;

const getToken = (response: any, userData: any) =>
  userData?.token ||
  response?.token ||
  response?.data?.token ||
  response?.data?.user?.token ||
  '';

const getRole = (response: any, userData: any) =>
  userData?.role ||
  response?.role ||
  response?.data?.role ||
  response?.data?.user?.role ||
  '';

export const authService = {
  async login(email: string, password: string) {
    try {
      const response: any = await authAPI.login(email, password);
      const userData = getUserData(response);
      const token = getToken(response, userData);
      const role = getRole(response, userData);
      const user = {
        ...userData,
        role,
      };

      if (token) {
        await storageService.setItem('authToken', token);
        await storageService.setItem('token', token);
      }

      await storageService.setItem('user', JSON.stringify(user));
      await storageService.setItem('userData', JSON.stringify(user));
      await storageService.setItem('role', role);

      return {
        ...user,
        token,
      };
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await authAPI.logout();
      await storageService.removeItem('authToken');
      await storageService.removeItem('token');
      await storageService.removeItem('user');
      await storageService.removeItem('userData');
      await storageService.removeItem('role');
    } catch (error) {
      throw error;
    }
  },

  async getToken() {
    return (
      (await storageService.getItem('authToken')) ||
      (await storageService.getItem('token'))
    );
  },

  async getUser() {
    const user =
      (await storageService.getItem('user')) ||
      (await storageService.getItem('userData'));
    const role = await storageService.getItem('role');

    if (!user) {
      return role ? {role} : null;
    }

    const parsedUser = JSON.parse(user);
    return {
      ...parsedUser,
      role: parsedUser?.role || role || '',
    };
  },

  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  },
};
