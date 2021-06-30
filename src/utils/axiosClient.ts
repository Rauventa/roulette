import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://gamebitcoinbackend.azurewebsites.net/api'
});