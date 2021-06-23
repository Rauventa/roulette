import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://376bdf703313.ngrok.io/api'
});