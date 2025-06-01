import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterDialog from '@/dialogs/FilterDialog';

jest.mock('@/components/UI/DialogInput', () => ({
  __esModule: true,
  default: ({ label, ...props }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input id={label} {...props} />
    </div>
  ),
}));

jest.mock('@/components/UI/DialogSelect', () => ({
  __esModule: true,
  default: ({ label, options, ...props }: any) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <select id={label} {...props}>
        {options?.map((option: any) => (
          <option key={option.id || option.name} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock('@/components/UI/DialogButton', () => ({
  __esModule: true,
  default: (props: any) => <button {...props} />,
}));

jest.mock('@/hooks/useLockBodyScroll', () => ({
  useLockBodyScroll: jest.fn(),
}));

jest.mock('@/contexts/AccountsContext', () => ({
  useAccounts: () => ({
    accounts: [
      { id: '1', name: 'Conta Corrente' },
      { id: '2', name: 'Poupança' },
    ],
  }),
}));

jest.mock('@/contexts/TransactionsContext', () => ({
  useTransactions: () => ({
    fetchTransactions: jest.fn(),
  }),
}));

jest.mock('@/controllers/TransactionController', () => ({
  transactionController: {
    getTransactions: jest.fn().mockResolvedValue([
      { id: 'tx1', description: 'Transação 1' },
      { id: 'tx2', description: 'Transação 2' },
    ]),
  },
}));

describe('FilterDialog', () => {
  const onCloseMock = jest.fn();
  const setTransactionsMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('não renderiza quando `open` é false', () => {
    const { container } = render(
      <FilterDialog open={false} onClose={onCloseMock} />
    );
    expect(container.firstChild).toBeNull();
  });

  describe('quando aberto na página de transações', () => {
    beforeEach(() => {
      render(
        <FilterDialog
          open={true}
          onClose={onCloseMock}
          isTransactionsPage={true}
          setTransactions={setTransactionsMock}
        />
      );
    });

    it('renderiza o select de contas', () => {
      expect(screen.getByLabelText('Conta')).toBeInTheDocument();
    });

    it('permite selecionar uma conta', () => {
      const select = screen.getByLabelText('Conta');
      fireEvent.change(select, { target: { value: '1' } });
      expect(select).toHaveValue('1');
    });

    it('chama `setTransactions` ao submeter com conta selecionada', async () => {
      const select = screen.getByLabelText('Conta');
      fireEvent.change(select, { target: { value: '1' } });
      fireEvent.click(screen.getByText('Filtrar'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(setTransactionsMock).toHaveBeenCalledWith([
        { id: 'tx1', description: 'Transação 1' },
        { id: 'tx2', description: 'Transação 2' },
      ]);
      expect(onCloseMock).toHaveBeenCalled();
    });

    it('chama `setTransactions` com todas as contas quando nenhuma for selecionada', async () => {
      const select = screen.getByLabelText('Conta');
      fireEvent.change(select, { target: { value: '' } });
      fireEvent.click(screen.getByText('Filtrar'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(setTransactionsMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });

    it('fecha o modal ao clicar em "Fechar"', () => {
      fireEvent.click(screen.getByText('Fechar'));
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  describe('quando aberto fora da página de transações', () => {
    it('exibe campos de data inicial e final', () => {
      render(<FilterDialog open={true} onClose={onCloseMock} />);
      expect(screen.getByLabelText('Data Inicial')).toBeInTheDocument();
      expect(screen.getByLabelText('Data Final')).toBeInTheDocument();
    });

    it('valida se a data final for anterior à inicial e impede submissão', () => {
      render(<FilterDialog open={true} onClose={onCloseMock} />);

      const dataInicial = screen.getByLabelText('Data Inicial');
      const dataFinal = screen.getByLabelText('Data Final');

      fireEvent.change(dataInicial, { target: { value: '2025-06-10' } });
      fireEvent.change(dataFinal, { target: { value: '2025-06-01' } });

      fireEvent.click(screen.getByText('Filtrar'));

      expect(onCloseMock).not.toHaveBeenCalled();
    });
  });
});