import { loginApi } from '../api/auth';
import { registerApi } from '../api/auth';  
import { verifyOtpApi } from '../api/auth';

export const login = async (email, password) => {
  const data = await loginApi(email, password);

  if (data?.accessToken) {
    localStorage.setItem('token', data.accessToken); 
  }
  
  return data;
};

export const register = async (email, username, password, fullname) => {
  const data = await registerApi(email, username, password, fullname);
  return data;
}

export const verifyOtp = async (otp, purpose) => {
  const data = await verifyOtpApi(otp, purpose);
  return data;
}
