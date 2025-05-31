"use client";

import { useState, useRef, useEffect } from "react";
import DialogInput from "@/components/UI/DialogInput";
import DialogSelect from "@/components/UI/DialogSelect";
import DialogButton from "@/components/UI/DialogButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import {
  convertTransactionTypeToScreenType,
  formatAmount,
  handleAmountInput,
} from "@/lib/transactionDialogUtils";
import { TransactionInterface, TransactionResponse } from "@/models/transaction";
import { useTransactions } from "@/contexts/TransactionsContext";
import { useAccounts } from "@/contexts/AccountsContext";
import { toast } from "react-toastify";
import moment from "moment";
import { AccountInterface } from "@/models/account";

interface TransactionDialogProps {
  type: "CREDITO" | "DEBITO" | "TRANSFERENCIA";
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transaction?: TransactionResponse;
  isViewing?: boolean;
}

export default function TransactionDialog({
  type,
  open,
  onClose,
  isViewing = false,
  transaction,
}: TransactionDialogProps) {
  const [amount, setAmount] = useState("100.00");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [accountOriginId, setAccountOriginId] = useState("");
  const [accountDestinationId, setAccountDestinationId] = useState("");
  const [isViewingAmount, setisViewingAmount] = useState(false);
  const [accountOptions, setAccountOptions] = useState<{id: string, name: string}[]>([]);
  const [placeholderWhenViewing, setPlaceholderWhenViewing] = useState("");

  const amountInputRef = useRef<HTMLInputElement>(null);
  
  const { createTransaction } = useTransactions();
  const { accounts, fetchAccounts } = useAccounts();

  const isTransfer = type === "TRANSFERENCIA";

  useLockBodyScroll(open);

  const resetForm = () => {
    setAmount("100.00");
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setAccountOriginId("");
    setAccountDestinationId("");
    setisViewingAmount(false);
  };

  useEffect(() => {
    if (open && !isViewing) {
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    if(!isViewing) {
      const options = accounts.map((a) => {
        return {
          id: a.id || "",
          name: a.name,
        };
      });
      setAccountOptions(options);
    }
    if (isViewing && transaction) {
      console.log("isViewing")
      console.log(transaction)
      if(transaction.type === "CREDITO" && transaction?.accountDestination) {
        console.log("credito e accountDestination")
        const option = transaction.accountDestination as any as AccountInterface
        setAccountOptions([{id: option.id || "", name: option.name}]);
        setPlaceholderWhenViewing(option.name);
    } else if(transaction.type === "DEBITO" && transaction?.accountOrigin) {
      console.log("debito e accountDestination")

        const option = transaction.accountOrigin as any as AccountInterface
        setAccountOptions([{id: option.id || "", name: option.name}]);
        console.log("option name")
        console.log(option.name)
        setPlaceholderWhenViewing(option.name);
      }
    }
  }, [open, accounts]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(handleAmountInput(e.target.value));
  };

  useEffect(() => {
    if (isViewingAmount && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isViewingAmount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: TransactionInterface = {
      type,
      amount: parseFloat(amount.replace(",", ".")),
      date: moment(date).toDate(),
      description,
    };

    if (type === "CREDITO") {
      transaction.accountDestinationId = accountDestinationId;
    } else if (type === "DEBITO") {
      transaction.accountOriginId = accountOriginId;
    } else if (type === "TRANSFERENCIA") {
      if(accountDestinationId === accountOriginId) {
        toast.info("A conta de origem e a conta de destino não podem ser as mesmas para a realização de uma transferência.");
        return;
      }
      transaction.accountOriginId = accountOriginId;
      transaction.accountDestinationId = accountDestinationId;
    }

    const data = await createTransaction(transaction);
    if (data) {
      fetchAccounts();
      resetForm();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-background-2 w-full h-full flex flex-col
                      sm:rounded-3xl sm:mx-4 sm:my-8 sm:w-[400px] ${
                        isTransfer ? "sm:h-[660px]" : "sm:h-[580px]"
                      } sm:max-h-[95vh] sm:overflow-hidden`}
      >
        <div className="bg-indigo-600 text-white w-full p-6 sm:h-32 h-48 flex flex-col justify-center">
          <span className="text-xs">
            Valor da {convertTransactionTypeToScreenType(type)}
          </span>
          <div className="relative">
            <span
              className={`text-3xl font-bold ${
                isViewingAmount ? "invisible" : "visible"
              }`}
              onClick={() => setisViewingAmount(true)}
            >
              R${formatAmount(amount)}
            </span>
            <div className="bg-background-2 sm:h-[50px] h-[72px] w-[100vw] sm:w-[400px] p-0  absolute ml-[-24px] rounded-t-3xl "></div>
            <input
              ref={amountInputRef}
              type="text"
              value={formatAmount(amount)}
              disabled={isViewing}
              onChange={handleAmountChange}
              onBlur={() => setisViewingAmount(false)}
              className={`absolute inset-0 bg-transparent text-white text-3xl font-bold border-none outline-none
                          ${isViewingAmount ? "visible" : "invisible"}`}
              style={{ paddingLeft: "0.75rem", paddingRight: "0.75rem" }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:gap-3 gap-8 p-6 flex-grow overflow-y-auto"
        >
          <DialogInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={isViewing}
            label="Data"
            className="text-color-1 dark:bg-neutral-800 border border-border font-semibold"
          />

          {type === "DEBITO" && (
            <DialogSelect
              value={accountOriginId}
              onChange={(e) => setAccountOriginId(e.target.value)}
              required
              disabled={isViewing}
              options={accountOptions}
              label="Conta de Origem"
              placeholder={isViewing ? placeholderWhenViewing : "Selecione a conta de origem"}
              className="text-color-1 dark:bg-neutral-800 border border-border  font-semibold"
            />
          )}

          {type === "CREDITO" && (
            <DialogSelect
              value={accountDestinationId}
              onChange={(e) => setAccountDestinationId(e.target.value)}
              required
              disabled={isViewing}
              options={accountOptions}
              label="Conta de Origem"
              placeholder={isViewing ? placeholderWhenViewing : "Selecione a conta de destino"}
              className="text-color-1 dark:bg-neutral-800 border border-border font-semibold"
            />
          )}

          {isTransfer && (
            <>
              <DialogSelect
                value={accountOriginId}
                onChange={(e) => setAccountOriginId(e.target.value)}
                required
                disabled={isViewing}
                options={accountOptions}
                label="Conta de Origem"
                placeholder="Selecione a conta de origem"
                className="dark:bg-neutral-800 border border-border text-color-1 font-semibold"
              />

              <DialogSelect
                value={accountDestinationId}
                onChange={(e) => setAccountDestinationId(e.target.value)}
                required
                disabled={isViewing}
                options={accountOptions}
                label="Conta de Origem"
                placeholder="Selecione a conta de destino"
                className="dark:bg-neutral-800 border border-border text-color-1 font-semibold"
              />
            </>
          )}

          <DialogInput
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isViewing}
            placeholder="Descrição"
            label="Descrição"
            className="dark:bg-neutral-800 border border-border text-color-1 font-semibold"
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
          {isViewing ? ( null ) : (
            <DialogButton
              type="submit"
              onClick={handleSubmit}
              className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
            >
              Confirmar
            </DialogButton>
          )}
        </div>
      </div>
    </div>
  );
}
