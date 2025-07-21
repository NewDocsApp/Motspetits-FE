import { loginApi } from '../api/auth';

export const login = async (email, password) => {
  const data = await loginApi(email, password);
  return data;
};