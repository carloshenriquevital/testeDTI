import axios from 'axios';
import { getAccessToken } from './auth';


const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export default api;