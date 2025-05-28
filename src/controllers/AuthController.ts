import { toast } from 'react-toastify';
import { authService } from '../services/AuthService';
import { apiService } from '../services/ApiService';

export class AuthController {
  private showToast: boolean;

  constructor(showToast = true) {
    this.showToast = showToast;
  }

  async login(email: string, password: string): Promise<string | null> {
    try {
      const data = await authService.login(email, password);
      apiService.setToken(data.accessToken);

      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('accessTokenExpiresAt', expiresAt.toString());

      if (this.showToast) toast.success('Login realizado com sucesso!');
      return data.accessToken;
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao logar: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }

  logout() {
    apiService.clearToken();
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessTokenExpiresAt');
    if (this.showToast) toast.info('Logout realizado com sucesso!');
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('accessToken');
    const expiresAt = sessionStorage.getItem('accessTokenExpiresAt');

    if (!token || !expiresAt) return false;

    if (Date.now() > Number(expiresAt)) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    if (!this.isAuthenticated()) return null;
    return sessionStorage.getItem('accessToken');
  }

  getValidToken(): string | null {
    const token = sessionStorage.getItem('accessToken');
    const expiresAt = sessionStorage.getItem('accessTokenExpiresAt');

    if (!token || !expiresAt) return null;

    if (Date.now() > Number(expiresAt)) {
      this.logout();
      return null;
    }

    return token;
  }
}

export const authController = new AuthController();
