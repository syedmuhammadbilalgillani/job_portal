import axios from 'axios';

const API_URL = 'https://bettertalentserver.vercel.app/api/v1/user';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
    }
};

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};

export const logout = () => {
    // Implement logout logic, e.g., removing tokens from local storage
};
