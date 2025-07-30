import axios from 'axios';

const url = import.meta.env.VITE_API_URL;

export const createDocumentApi = async (title, content) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw { message: 'Authentication token is missing' };
        const response = await axios.post(`${url}/api/v1/documents/`, {
            title,
            content
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data
    } catch (e) {
        throw e.response?.data || { message: `${e}` };
    }
}

export const getUserDocumentApi = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found!');
            throw { message: 'Authentication token is missing' };
        }
        const response = await axios.get(`${url}/api/v1/documents/my-documents`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        return response.data;
        
    } catch (e) {
        console.error('Error:', e);
        
        throw e.response?.data || { message: `${e}` };
    }
}
