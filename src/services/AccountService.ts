import { apiService } from './ApiService';
import { AccountInterface } from '../models/account';

export class AccountService {
  private api = apiService.client;

  async createAccount(data: AccountInterface): Promise<AccountInterface> {
    const response = await this.api.post('/accounts', data);
    return response.data;
  }

  async getAccounts(): Promise<AccountInterface[]> {
    const response = await this.api.get('/accounts');
    return response.data;
  }
}

export const accountService = new AccountService();