"use client";

import { useState, useRef, useEffect } from "react";
import DialogInput from "@/components/UI/DialogInput";
import DialogSelect from "@/components/UI/DialogSelect";
import DialogButton from "@/components/UI/DialogButton";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { convertTransactionTypeToScreenType, formatAmount, handleAmountInput } from "@/lib/transactionDialogUtils";
import { TransactionInterface } from "@/models/transaction";

interface TransactionDialogProps {
  type: 'CREDITO' | 'DEBITO' | 'TRANSFERENCIA';
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onEdit?: (data: any) => void;
  onDelete?: (id: string) => void;
  accounts: { id: string; name: string }[];
  transaction?: TransactionInterface;
  isEditing?: boolean;
}

export default function TransactionDialog({
  type,
  open,
  onClose,
  onSubmit,
  onEdit,
  onDelete,
  accounts,
  isEditing = false,
  transaction
}: TransactionDialogProps) {
  const [amount, setAmount] = useState('100.00');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');
  const [accountOriginId, setAccountOriginId] = useState('');
  const [accountDestinationId, setAccountDestinationId] = useState('');
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const amountInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && transaction && open) {
      setAmount(formatAmount(transaction.amount.toString()));
      setDate(transaction.date ? new Date(transaction.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
      setDescription(transaction.description || '');
      setAccountOriginId(transaction.accountOriginId || '');
      setAccountDestinationId(transaction.accountDestinationId || '');
    }
  }, [isEditing, transaction, open]);

  const isTransfer = type === 'TRANSFERENCIA';

  useLockBodyScroll(open);

  const resetForm = () => {
    setAmount('100.00');
    setDate(new Date().toISOString().slice(0, 10));
    setDescription('');
    setAccountOriginId('');
    setAccountDestinationId('');
    setIsEditingAmount(false);
  };

  useEffect(() => {
    if (open && !isEditing) {
      resetForm();
    }
  }, [open]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(handleAmountInput(e.target.value));
  };

  useEffect(() => {
    if (isEditingAmount && amountInputRef.current) {
      amountInputRef.current.focus();
    }
  }, [isEditingAmount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      type,
      amount: parseFloat(amount.replace(',', '.')),
      date: new Date(date),
      description,
    };

    if (type === 'CREDITO') {
      data.accountDestinationId = accountDestinationId;
    } else if (type === 'DEBITO') {
      data.accountOriginId = accountOriginId;
    } else if (type === 'TRANSFERENCIA') {
      data.accountOriginId = accountOriginId;
      data.accountDestinationId = accountDestinationId;
    }

    onSubmit(data);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-background-2 w-full h-full flex flex-col
                      sm:rounded-3xl sm:mx-4 sm:my-8 sm:w-[400px] ${isTransfer ? 'sm:h-[660px]' : 'sm:h-[580px]'} sm:max-h-[95vh] sm:overflow-hidden`}>
        <div className="bg-indigo-600 text-white w-full p-6 sm:h-32 h-48 flex flex-col justify-center">
          <span className="text-xs">Valor da {convertTransactionTypeToScreenType(type)}</span>
          <div className="relative">
            <span
              className={`text-3xl font-bold ${isEditingAmount ? 'invisible' : 'visible'}`}
              onClick={() => setIsEditingAmount(true)}
            >
              R${formatAmount(amount)}
            </span>
            <div className="bg-background-2 sm:h-[50px] h-[72px] w-[100vw] sm:w-[400px] p-0  absolute ml-[-24px] rounded-t-3xl "></div>
            <input
              ref={amountInputRef}
              type="text"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              onBlur={() => setIsEditingAmount(false)}
              className={`absolute inset-0 bg-transparent text-white text-3xl font-bold border-none outline-none
                          ${isEditingAmount ? 'visible' : 'invisible'}`}
              style={{ paddingLeft: '0.75rem', paddingRight: '0.75rem' }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:gap-3 gap-8 p-6 flex-grow overflow-y-auto">
          <DialogInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            label="Data"
            className="text-color-1 dark:bg-neutral-800 border border-border font-semibold"
          />

          {type === 'DEBITO' && (
            <DialogSelect
              value={accountOriginId}
              onChange={(e) => setAccountOriginId(e.target.value)}
              required
              options={accounts}
              label="Conta de Origem"
              placeholder="Selecione a conta de origem"
              className="text-color-1 dark:bg-neutral-800 border border-border  font-semibold"
            />
          )}

          {type === 'CREDITO' && (
            <DialogSelect
              value={accountDestinationId}
              onChange={(e) => setAccountDestinationId(e.target.value)}
              required
              options={accounts}
              label="Conta de Origem"
              placeholder="Selecione a conta de destino"
              className="text-color-1 dark:bg-neutral-800 border border-border font-semibold"
            />
          )}

          {isTransfer && (
            <>
              <DialogSelect
                value={accountOriginId}
                onChange={(e) => setAccountOriginId(e.target.value)}
                required
                options={accounts}
                label="Conta de Origem"
                placeholder="Selecione a conta de origem"
                className="dark:bg-neutral-800 border border-border text-color-1 font-semibold"
              />

              <DialogSelect
                value={accountDestinationId}
                onChange={(e) => setAccountDestinationId(e.target.value)}
                required
                options={accounts}
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
            placeholder="Descrição"
            label="Descrição"
            className="dark:bg-neutral-800 border border-border text-color-1 font-semibold"
          />
        </form>
        <div className="p-6 pt-0 flex flex-col gap-3 w-full flex-shrink-0">
          {isEditing ? (
            <>
              <DialogButton
                type="button"
                onClick={onClose}
                className="bg-gray-800 dark:bg-neutral-800 text-white font-semibold cursor-pointer"
              >
                Fechar
              </DialogButton>
              <DialogButton
                type="button"
                onClick={(id: any) => {
                  if (onDelete) {
                    onDelete(id);
                  }
                  onClose();
                }}
                className="bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
              >
                Excluir
              </DialogButton>
              <DialogButton
                type="submit"
                onClick={handleSubmit}
                className="bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition cursor-pointer"
              >
                Editar
              </DialogButton>
            </>
          ) : (
            <>
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
                Confirmar
              </DialogButton>
            </>
          )}
        </div>
      </div >
    </div >
  );
}