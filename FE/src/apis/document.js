import axios from "axios";
import { API_BASE_URL } from "./config";

const accessToken = localStorage.getItem('accessToken')
class DocumentApi {
    
    async getUserDocuments() {
        
        const reponse = await axios.get(`${API_BASE_URL}/documents/my-documents`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return reponse.data
    }

    async getDocumentById(id) {
        
        const response = await axios.get(`${API_BASE_URL}/documents/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data
    }

    async saveDocument(id, data) {
        
        const response = await axios.put(
            `${API_BASE_URL}/documents/${id}`, 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            
            }
        )
        return response.data
    }

    async createDocument(data) {
        const response = await axios.post(
            `${API_BASE_URL}/documents/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    }
}

const documentApi = new DocumentApi()
export default documentApi
