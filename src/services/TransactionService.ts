import { apiService } from './ApiService';
import { TransactionInterface } from '../models/transaction';

export class TransactionService {
  private api = apiService.client;

  async createTransaction(
    data: Omit<TransactionInterface, 'id' | 'date'>
  ): Promise<TransactionInterface> {
    const response = await this.api.post('/transactions', data)
    
    return response.data;
  }

  async getTransactions(
    params: { accountId?: string; startDate?: string; endDate?: string }
  ): Promise<TransactionInterface[]> {
    const response = await this.api.get('/transactions', { params });
    return response.data;
  }
}

export const transactionService = new TransactionService();