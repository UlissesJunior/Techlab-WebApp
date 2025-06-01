"use client";

import { useState } from "react";
import DialogInput from "@/components/UI/DialogInput";
import DialogSelect from "@/components/UI/DialogSelect";
import DialogButton from "@/components/UI/DialogButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useAccounts } from "@/contexts/AccountsContext";
import { useTransactions } from "@/contexts/TransactionsContext";
import moment from "moment";
import { toast } from "react-toastify";
import {
  TransactionInterface,
  TransactionResponse,
} from "@/models/transaction";
import { transactionController } from "@/controllers/TransactionController";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  isTransactionsPage?: boolean;
  setTransactions?: (transactions: TransactionInterface[]) => void;
}

export default function FilterDialog({
  open,
  onClose,
  isTransactionsPage = false,
  setTransactions = () => {},
}: FilterDialogProps) {
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [selectedDateMin, setSelectedDateMin] = useState<string>(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [selectedDateMax, setSelectedDateMax] = useState<string>(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const { accounts } = useAccounts();
  const { fetchTransactions } = useTransactions();

  useLockBodyScroll(open);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isTransactionsPage) {
      if(selectedAccount !== "") {
        const response = await transactionController.getTransactions({
          accountId: selectedAccount,
        });
        setTransactions(response || []);
      } else {
        const response = await transactionController.getTransactions({});
        setTransactions(response || []);
      }
    } else {
      if (moment(selectedDateMax).isBefore(selectedDateMin)) {
        toast.info("A data final não pode ser anterior à data inicial.");
        return;
      }
      await fetchTransactions({
        startDate: selectedDateMin
          ? moment(selectedDateMin).toISOString()
          : undefined,
        endDate: selectedDateMax
          ? moment(selectedDateMax).toISOString()
          : undefined,
      });
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-background-2 w-full h-full flex flex-col
              sm:rounded-3xl sm:mx-4 sm:my-8 sm:w-[400px] ${
                isTransactionsPage ? "sm:h-[260px]" : "sm:h-[360px]"
              } sm:max-h-[95vh] sm:overflow-hidden`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:gap-3 gap-8 p-6 flex-grow overflow-y-auto"
        >
          {!isTransactionsPage ? (
            <>
              <DialogInput
                label="Data Inicial"
                type="date"
                className="border border-border text-color-1"
                value={selectedDateMin}
                onChange={(e) => setSelectedDateMin(e.target.value)}
              />
              <DialogInput
                label="Data Final"
                type="date"
                className="border border-border text-color-1"
                value={selectedDateMax}
                onChange={(e) => setSelectedDateMax(e.target.value)}
              />
            </>
          ) : (
            <DialogSelect
              label="Conta"
              options={[
                { id: "", name: "Selecione as contas" },
                { id: "", name: "Todas as contas" },
                ...accounts.map((account) => ({
                  id: account.id || "",
                  name: account.name,
                }))
              ]}
              placeholder="Selecione a conta"
              className="border border-border text-color-1"
              onChange={(e) => setSelectedAccount(e.target.value)}
            />
          )}
        </form>

        <div className="p-6 pt-0 flex flex-col gap-3 w-full flex-shrink-0">
          <DialogButton
            type="button"
            onClick={() => {
              onClose();
            }}
            className="bg-gray-800 dark:bg-neutral-800 text-white font-semibold cursor-pointer"
          >
            Fechar
          </DialogButton>

          <DialogButton
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Filtrar
          </DialogButton>
        </div>
      </div>
    </div>
  );
}
