import { toast } from 'react-toastify';
import { userService } from '../services/UserService';
import { UserInterface } from '../models/user';

export class UserController {
  private showToast: boolean;

  constructor(showToast = true) {
    this.showToast = showToast;
  }

  async createUser(data: UserInterface): Promise<UserInterface | null> {
    try {
      const user = await userService.createUser(data);
      if (this.showToast) toast.success('Usuário criado com sucesso!');
      return user;
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao criar usuário: ${error.response?.data?.message || error.message}`);
      return null;
    }
  }

  async uploadPhoto(userId: string, base64Photo: string): Promise<void> {
    try {
      await userService.uploadPhoto(userId, base64Photo);
      if (this.showToast) toast.success('Foto enviada com sucesso!');
    } catch (error: any) {
      if (this.showToast) toast.error(`Erro ao enviar foto: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }
}

export const userController = new UserController();