import axios from 'axios';
import Config from "react-native-config";

export function setupAPIClient() {

    console.log(Config)

    const api = axios.create({
        baseURL: "http://192.168.9.140:3333",
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