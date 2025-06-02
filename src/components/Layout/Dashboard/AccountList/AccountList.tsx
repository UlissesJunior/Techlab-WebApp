import { BalanceCard } from "@/components/UI/BalanceCard";
import AccountDialog from "@/dialogs/AccountDialog";
import { getLogoByBankName } from "@/lib/banksUtils";
import { formatAmount } from "@/lib/transactionDialogUtils";
import { AccountInterface } from "@/models/account";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AccountList({ accounts, fetchAccounts }: { accounts: AccountInterface[], fetchAccounts: () => void }) {
  const [open, setOpen] = useState(false);
  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center text-gray-500">Nenhuma conta cadastrada.</div>
    );
  }
  return (
    <>
      {accounts.map((account) => (
        <BalanceCard
          key={account.id}
          title={account.name}
          icon={getLogoByBankName(account.name.toLowerCase())}
          value={
            account.balance ? formatAmount(account.balance.toString()) : "0,00"
          }
          type={account.type}
          bank={account.name}
          metallic
        />
      ))}

      <button
        className="rounded-2xl p-4 shadow-lg cursor-pointer transition-all duration-300 bg-background-3 dark:bg-card text-color-1 
    flex flex-col justify-between h-full w-full hover:opacity-90"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-between items-center md:flex-row md:justify-center md:gap-2 md:h-full">
          <h3 className="text-color-1 text-sm opacity-80 md:text-xl md:font-medium">
            Adicionar Conta
          </h3>
          <div className="w-6 h-6 flex items-center justify-center md:w-8 md:h-8">
            <Plus className="md:w-6 md:h-6" />
          </div>
        </div>
      </button>
      <AccountDialog 
        open={open} 
        onClose={() => setOpen(false)}
      />
    </>
  );
}