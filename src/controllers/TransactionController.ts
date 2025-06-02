import { toast } from 'react-toastify';
import { transactionService } from '../services/TransactionService';
import { TransactionInterface } from '../models/transaction';

export class TransactionController {
   private showToast: boolean;

  constructor(showToast = true) {
    this.showToast = showToast;
  }

  setShowToast(showToast: boolean) {
    this.showToast = showToast;
  }

  async createTransaction(data: Omit<TransactionInterface, 'id' | 'date'>): Promise<TransactionInterface | null> {
    try {
      const transaction = await transactionService.createTransaction(data);
      toast.success('Transação realizada com sucesso!');
      return transaction;
    } catch (error: any) {
      toast.error(`Erro ao criar transação: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }

  async getTransactions(params: { accountId?: string; startDate?: string; endDate?: string }): Promise<TransactionInterface[] | null> {
    try {
      const transactions = await transactionService.getTransactions(params);
      if (this.showToast) toast.success('Transações carregadas!');
      return transactions;
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao buscar transações: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }
}

export const transactionController = new TransactionController();