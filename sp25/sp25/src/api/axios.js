
import axios from 'axios';
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000, // Set a timeout of 10 seconds
})