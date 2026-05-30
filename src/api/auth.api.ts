import {API_CONFIG} from './config';
import {mockLogin} from './mock/auth.mock';
import { loginApi } from './services/auth.services';


export const login = async (
  emailOrPhone: string,
  password: string,
) => {
  if (API_CONFIG.IS_DEMO) {
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