import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'https://gamebitco-in.azurewebsites.net/api'
});