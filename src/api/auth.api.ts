import {API_CONFIG} from './config';
import {mockLogin} from './mock/auth.mock';
import { loginApi } from './services/auth.services';

export const login = async (
  emailOrPhone: string,
  password: string,
) => {
  if (API_CONFIG.USE_DUMMY_API) {
    return mockLogin(
      emailOrPhone,
      password,
    );
  }

  return loginApi(
    emailOrPhone,
    password,
  );
};

export const logout = async () => {
  if (API_CONFIG.USE_DUMMY_API) {
    return Promise.resolve({ success: true });
  }

  // Add a real backend logout endpoint here if available.
  return Promise.resolve({ success: true });
};

export const authAPI = {
  login,
  logout,
};

