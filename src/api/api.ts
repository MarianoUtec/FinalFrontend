import axios from "axios";

const api = axios.create({baseURL: import.meta.env.VITE_API_URL, headers: {'Content-Type': 'application/json'}});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem('token');
        window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
});


//AUTH


export function login(email: string, password: string) {
    return api.post<{token:string}>('/auth/login', {email, password});
}

export function register(body: { email: string; password: string; name: string; }) {
    return api.post<{token:string}>('/auth/register', body);
}



export default api;