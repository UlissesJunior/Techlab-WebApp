import { toast } from 'react-toastify';
import { accountService } from '../services/AccountService';
import { AccountInterface } from '../models/account';

export class AccountController {
  private showToast: boolean;

  constructor(showToast = true) {
    this.showToast = showToast;
  }

  setShowToast(showToast: boolean) {
    this.showToast = showToast;
  }

  async createAccount(data: AccountInterface): Promise<AccountInterface | null> {
    try {
      const account = await accountService.createAccount(data);
      if (this.showToast) toast.success('Conta criada com sucesso!');
      return account;
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao criar conta: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }

  async getAccounts(): Promise<AccountInterface[] | null> {
    try {
      const accounts = await accountService.getAccounts();
      if (this.showToast) toast.success('Contas carregadas!');
      return accounts;
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao buscar contas: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }
}

export const accountController = new AccountController();
