import { loginApi } from '../api/auth';
import { registerApi } from '../api/auth';  

export const login = async (email, password) => {
  const data = await loginApi(email, password);
  return data;
};

export const register = async (email, username, password, fullname) => {
  const data = await registerApi(email, username, password, fullname);
  return data;
}
