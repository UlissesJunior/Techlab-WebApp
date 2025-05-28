import { apiService } from './ApiService';
import { UserInterface } from '../models/user';

export class UserService {
  private api = apiService.client;

  async createUser(data: UserInterface): Promise<UserInterface> {
    const response = await this.api.post('/users', data);
    return response.data;
  }
}

export const userService = new UserService();
