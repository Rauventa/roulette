import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://gbtc-b.azurewebsites.net/api'
});