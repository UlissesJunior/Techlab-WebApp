"use client";

import { useState, useRef, useEffect } from "react";
import DialogInput from "@/components/UI/DialogInput";
import DialogSelect from "@/components/UI/DialogSelect";
import DialogButton from "@/components/UI/DialogButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import {
    amountStringToNumber,
  convertTransactionTypeToScreenType,
  formatAmount,
  handleAmountInput,
} from "@/lib/transactionDialogUtils";
import { TransactionInterface } from "@/models/transaction";
import { AccountInterface, AccountType } from "@/models/account";
import { accountController } from "@/controllers/AccountController";
import { useAccounts } from "@/contexts/AccountsContext";

interface AccountDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AccountDialog({
  open,
  onClose,
}: AccountDialogProps) {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("CORRENTE");
  const [accountBalance, setAccountBalance] = useState<string | number>("0.00");

  const { fetchAccounts } = useAccounts()
  useLockBodyScroll(open);

  const resetForm = () => {
    setAccountName("");
    setAccountType("CORRENTE");
    setAccountBalance("0.00");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = await accountController.createAccount({
      name: accountName,
      type: accountType,
      balance: amountStringToNumber(accountBalance as string),
    });
    
    if(data) {
        fetchAccounts();
        resetForm();
        onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    data-testid="account-dialog-container">
      <div
        className={`bg-background-2 w-full h-full flex flex-col
                    sm:rounded-3xl sm:mx-4 sm:my-8 sm:w-[400px] sm:h-[460px] sm:max-h-[95vh] sm:overflow-hidden`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:gap-3 gap-8 p-6 flex-grow overflow-y-auto"
        >
          <DialogInput
           id="nomeConta"
            label="Nome da Conta"
            type="text"
            className="border border-border text-color-1"
            required
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <DialogSelect
            id="tipoConta"
            label="Tipo de Conta"
            options={[
              { id: "CORRENTE", name: "Corrente" },
              { id: "POUPANCA", name: "Poupança" },
              { id: "CREDITO", name: "Crédito" },
              { id: "INVESTIMENTO", name: "Investimento" },
            ]}
            placeholder="Selecione o tipo de conta"
            className="border border-border text-color-1"
            onChange={(e) => setAccountType(e.target.value as AccountType)}
          />
          <DialogInput
            id="saldoInicial"
            label="Saldo Inicial"
            type="text"
            className="border border-border text-color-1"
            value={accountBalance}
            onChange={(e) =>
              setAccountBalance(formatAmount(handleAmountInput(e.target.value)))
            }
          />
        </form>
        <div className="p-6 pt-0 flex flex-col gap-3 w-full flex-shrink-0">
          <DialogButton
            type="button"
            onClick={onClose}
            className="bg-gray-800 dark:bg-neutral-800 text-white font-semibold cursor-pointer"
          >
            Fechar
          </DialogButton>

          <DialogButton
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Cadastrar
          </DialogButton>
        </div>
      </div>
    </div>
  );
}
