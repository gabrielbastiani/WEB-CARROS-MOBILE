import axios from 'axios';
import Config from "react-native-config";

export function setupAPIClient() {
    const api = axios.create({
        baseURL: Config.LOCALHOST_IP,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("Erro na API")
            }
            return Promise.reject(error);
        }
    );

    return api;

}