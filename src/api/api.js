import axios from 'axios';
import { getParams } from '../utils/helper';


const api = axios.create({
    baseURL: 'https://chartflowapi-production.up.railway.app',
    withCredentials: true,
});


export const signInUser = async (email, password) => {
    try {
        const response = await api.post('/api/users/signin', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signUpUser = async (name, email, password) => {
    try {
        const response = await api.post('/api/users/signup', { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        const response = await api.post('api/dashboard/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserInfo = async (email, password) => {
    try {
        const response = await api.get('/api/dashboard/');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFeaturesApi = async (start_date, end_date, age, gender) => {
    try {
        const response = await api.get('/api/dashboard/features', {
            params: getParams(start_date, end_date, age, gender)
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTrendApi = async (start_date, end_date, age, gender, category) => {
    try {
        
        const response = await api.get('/api/dashboard/trend', {
            params: getParams(start_date, end_date, age, gender, category)
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}