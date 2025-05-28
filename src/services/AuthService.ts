import { apiService } from './ApiService';

export class AuthService {
  private api = apiService.client;

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const response = await this.api.post('/auth/login', { email, password });
    return response.data;
  }
}

export const authService = new AuthService();