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


export function login(username: string, password: string) {
    return api.post<{token:string}>('/auth/login', {username, password});
}

export function register(body: { username: string; email: string; password: string; fullName: string; }) {
    return api.post<{token:string}>('/auth/register', body);
}

// LISTA DE PRODUCTOS

export interface ProductDTO{
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl: string;
    available: {"DISPONIBLE": boolean};
}

export function getProducts() {
    return api.get<ProductDTO[]>('/products');
}



export default api;