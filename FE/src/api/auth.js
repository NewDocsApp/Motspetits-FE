import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const loginApi = async (email, password) => {
    try {
    const response = await axios.post(`${url}/api/v1/auth/login`, {
      email,
      password,
    });
    
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: `${error}` };
  }
}

export const registerApi = async (email, username, password, fullname) => {
  try {
    const response = await axios.post(`${url}/api/v1/auth/register`, {
      email,
      username,
      password,
      fullname
    });

    return response.data;
  } catch (error){
    throw error.response?.data || { message: `${error}`};
  }
}

export const verifyOtpApi = async (otp, purpose) => {
  try {
    const response = await axios.post(`${url}/api/v1/auth/verify-otp`, {
      otp,
      purpose
    }) 
    return response.data;
  }
  catch (err) {
    throw error.response?.data || { message: `${error}`};
  }

}