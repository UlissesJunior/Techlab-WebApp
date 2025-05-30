import axios from 'axios';

class ApiService {
  private instance = axios.create({
    baseURL: 'http://localhost:8080',
  });

  private token: string | null = null;

  constructor() {
    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  get client() {
    return this.instance;
  }
}

export const apiService = new ApiService();