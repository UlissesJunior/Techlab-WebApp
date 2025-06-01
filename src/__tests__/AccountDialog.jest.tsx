import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountDialog from '@/dialogs/AccountDialog';
import { AccountsProvider } from '@/contexts/AccountsContext';

jest.mock('@/components/UI/DialogInput', () => ({ 
  label, ...props }: any) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <input id={props.id} {...props} />
  </div>
));

jest.mock('@/components/UI/DialogSelect', () => ({ 
  label, options, ...props }: any) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <select id={props.id} {...props}>
      {options?.map((option: any) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
));

jest.mock('@/components/UI/DialogButton', () => (props: any) => (
  <button {...props} />
));

jest.mock('@/hooks/useLockBodyScroll', () => ({
  useLockBodyScroll: jest.fn(),
}));

jest.mock('@/controllers/AccountController', () => ({
  accountController: {
    createAccount: jest.fn().mockResolvedValue({}),
    getAccounts: jest.fn().mockResolvedValue([]),
  },
}));

describe('AccountDialog', () => {
  const onCloseMock = jest.fn();

  const renderWithProviders = (open: boolean) => {
    return render(
      <AccountsProvider>
        <AccountDialog open={open} onClose={onCloseMock} />
      </AccountsProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('não renderiza quando open é false', () => {
    const { container } = renderWithProviders(false);
    expect(container.firstChild).toBeNull();
  });

  describe('quando aberto', () => {
    beforeEach(() => {
      renderWithProviders(true);
    });

    it('renderiza corretamente', () => {
      expect(screen.getByTestId('account-dialog-container')).toBeInTheDocument();
      expect(screen.getByLabelText('Nome da Conta')).toBeInTheDocument();
      expect(screen.getByLabelText('Tipo de Conta')).toBeInTheDocument();
      expect(screen.getByLabelText('Saldo Inicial')).toBeInTheDocument();
    });

    it('fecha quando clicar no botão Fechar', () => {
      fireEvent.click(screen.getByText('Fechar'));
      expect(onCloseMock).toHaveBeenCalled();
    });

    it('atualiza o campo nome corretamente', () => {
      const nomeInput = screen.getByLabelText('Nome da Conta');
      fireEvent.change(nomeInput, { target: { value: 'Nova Conta' } });
      expect(nomeInput).toHaveValue('Nova Conta');
    });

    it('valida o formulário antes de submeter', () => {
      const nomeInput = screen.getByLabelText('Nome da Conta');
      fireEvent.click(screen.getByText('Cadastrar'));
      expect(nomeInput).toBeInvalid();
    });

    it('permite selecionar tipo de conta', () => {
      const select = screen.getByLabelText('Tipo de Conta');
      fireEvent.change(select, { target: { value: 'POUPANCA' } });
      expect(select).toHaveValue('POUPANCA');
    });
  });
});