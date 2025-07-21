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