import axios from 'axios';
import {BASE_URL} from '../config';

export const loginApi = async (
  username: string,
  password: string,
) => {
  const response = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      username,
      password,
    },
  );

  return response.data;
};