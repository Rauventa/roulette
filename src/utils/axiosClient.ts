import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://f58b7606f28f.ngrok.io/api'
});