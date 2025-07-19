import axios from "axios"
import {API_BASE_URL} from "./config"
class AuthApi {
    async login({email, password}) {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password
        });
        return response.data
    }
}

const authApi = new AuthApi()
export default authApi