import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionDialog from '@/dialogs/TransactionDialog';
import { TransactionsProvider } from '@/contexts/TransactionsContext';
import { AccountsProvider } from '@/contexts/AccountsContext';

jest.mock('@/components/UI/DialogInput', () => ({
    label, ...props }: any) => (
    <div>
        <label htmlFor={props.id}>{label}</label>
        <input id={props.id} {...props} data-testid={`input-${label.toLowerCase().replace(/\s+/g, '-')}`} />
    </div>
));

jest.mock('@/components/UI/DialogSelect', () => ({
    label, options, ...props }: any) => (
    <div>
        <label htmlFor={props.id}>{label}</label>
        <select id={props.id} {...props} data-testid={`select-${label.toLowerCase().replace(/\s+/g, '-')}`}>
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

jest.mock('react-toastify', () => ({
    toast: {
        info: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('@/controllers/TransactionController', () => ({
    transactionController: {
        createTransaction: jest.fn().mockResolvedValue({}),
        setShowToast: jest.fn(),
    },
}));

jest.mock('@/controllers/AccountController', () => ({
    accountController: {
        getAccounts: jest.fn().mockResolvedValue([]),
    },
}));

const mockAccounts = [
    { id: "1", name: "Conta Corrente" },
    { id: "2", name: "Poupança" },
];

jest.mock('@/contexts/AccountsContext', () => ({
    ...jest.requireActual('@/contexts/AccountsContext'),
    useAccounts: () => ({
        accounts: mockAccounts,
        fetchAccounts: jest.fn(),
    }),
}));

jest.mock('@/contexts/TransactionsContext', () => ({
    ...jest.requireActual('@/contexts/TransactionsContext'),
    useTransactions: () => ({
        createTransaction: jest.fn().mockResolvedValue({ id: 'tx123' }),
    }),
}));

describe('TransactionDialog', () => {
    const onCloseMock = jest.fn();

    const renderWithProviders = (props: any) => {
        return render(
            <AccountsProvider>
                <TransactionsProvider>
                    <TransactionDialog
                        open={props.open}
                        onClose={onCloseMock}
                        type={props.type}
                        isViewing={props.isViewing}
                        transaction={props.transaction}
                    />
                </TransactionsProvider>
            </AccountsProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('não renderiza quando open é false', () => {
        const { container } = renderWithProviders({ open: false, type: 'CREDITO' });
        expect(container.firstChild).toBeNull();
    });

    describe('quando aberto para CREDITO', () => {
        beforeEach(() => {
            renderWithProviders({ open: true, type: 'CREDITO' });
        });

        it('renderiza corretamente', () => {
            expect(screen.getByText(/Valor da Receita/i)).toBeInTheDocument();
            expect(screen.getByTestId('input-data')).toBeInTheDocument();
            expect(screen.getByTestId('select-conta-de-origem')).toBeInTheDocument();
            expect(screen.getByTestId('input-descrição')).toBeInTheDocument();
        });

        it('fecha quando clicar no botão Fechar', () => {
            fireEvent.click(screen.getByText('Fechar'));
            expect(onCloseMock).toHaveBeenCalled();
        });

        it('permite editar os campos do formulário', () => {
            const descriptionInput = screen.getByTestId('input-descrição');
            fireEvent.change(descriptionInput, { target: { value: 'Salário' } });
            expect(descriptionInput).toHaveValue('Salário');
        });

    });

    describe('quando aberto para TRANSFERENCIA', () => {
        beforeEach(() => {
            renderWithProviders({ open: true, type: 'TRANSFERENCIA' });
        });

        it('mostra dois selects de conta', () => {
            const selects = screen.getAllByTestId(/select-conta-de-origem/);
            expect(selects).toHaveLength(2);
        });

        it('impede transferência entre mesma conta', async () => {
            const selects = screen.getAllByTestId(/select-conta-de-origem/);
            fireEvent.change(selects[0], { target: { value: '1' } });
            fireEvent.change(selects[1], { target: { value: '1' } });

            fireEvent.click(screen.getByText('Confirmar'));

            await waitFor(() => {
                expect(require('react-toastify').toast.info)
                    .toHaveBeenCalledWith(expect.stringContaining('não podem ser as mesmas'));
            });
        });
    });

    describe('quando em modo de visualização', () => {
        const mockTransaction = {
            id: '1',
            amount: 100,
            type: 'DEBITO',
            date: new Date().toISOString(),
            description: 'Compra mercado',
            accountOrigin: { id: '1', name: 'Conta Corrente' },
        };

        beforeEach(() => {
            renderWithProviders({
                open: true,
                type: 'DEBITO',
                isViewing: true,
                transaction: mockTransaction
            });
        });

        it('mostra os campos desabilitados', () => {
            expect(screen.getByTestId('input-descrição')).toBeDisabled();
            expect(screen.getByTestId('select-conta-de-origem')).toBeDisabled();
        });

        it('não mostra botão de confirmar', () => {
            expect(screen.queryByText('Confirmar')).not.toBeInTheDocument();
        });
    });
});