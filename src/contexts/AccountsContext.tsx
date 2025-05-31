"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AccountInterface } from "@/models/account";
import { accountController } from "@/controllers/AccountController";

interface AccountsContextType {
  accounts: AccountInterface[];
  setAccounts: (accounts: AccountInterface[]) => void;
  fetchAccounts: () => Promise<void>;
  totalAmount: number;
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchAccounts = async () => {
    const accountsResponse = await accountController.getAccounts();
    setAccounts(accountsResponse ?? []);

    const total = (accountsResponse ?? []).reduce(
      (acc, account) => (account.balance ? acc + account.balance : acc + 0),
      0
    );
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts, fetchAccounts, totalAmount }}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccounts = () => {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error("useAccounts must be used within an AccountsProvider");
  }
  return context;
};