import axios from 'axios';
import { getToken } from '@/helpers/token'

export const domain = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export const getURL = (path) => {
    return `${domain}${path}`;
};

export const getHeaders = () => {

    return {
        Authorization: `Bearer ${getToken()}`,
    }
};

export const post = (url, data = {}) => {
    return axios.post(getURL(url), data, {
        headers: getHeaders(),
    });
};

export const del = (url) => {
    return axios.delete(getURL(url), {
        headers: getHeaders(),
    });
};

export const get = (url, data = {}) => {
    return axios.get(getURL(url), {
        params: data,
        headers: getHeaders(),
    });
};