import axios, { type AxiosInstance } from "axios";

const culqiInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});



export default culqiInstance;
