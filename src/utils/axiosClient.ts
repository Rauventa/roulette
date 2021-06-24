import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: 'http://28c6c4d567bb.ngrok.io/api'
});