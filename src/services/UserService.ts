import { apiService } from './ApiService';
import { UserInterface } from '../models/user';

export class UserService {
  private api = apiService.client;

  async createUser(data: UserInterface): Promise<UserInterface> {
    const response = await this.api.post('/users', data);
    return response.data;
  }

  async uploadPhoto(userId: string, base64Photo: string) {
    const response = await this.api.post(`/users/${userId}/photo`, { photo: base64Photo });
    return response.data;
  }

  async getMyPhoto(): Promise<string | null> {
    try {
      const response = await this.api.get('/users/me/photo');
      return response.data.photo;
    } catch (error) {
      console.error('Erro ao buscar foto do usuário:', error);
      throw error;
    }
  }
}

export const userService = new UserService();