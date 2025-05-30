"use client"

import { AccountList } from "@/components/Layout/Dashboard/AccountList/AccountList";
import { BarChart, BarChartTransaction } from "@/components/Layout/Dashboard/Charts/BarChart";
import TransactionsList from "@/components/Layout/Dashboard/Transactions/TransactionsList";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import ApplyFiltersButton from "@/components/UI/ApplyFiltersButton";
import { BalanceCard } from "@/components/UI/BalanceCard";
import OperationsButton from "@/components/UI/OperationsButton";
import { accountController } from "@/controllers/AccountController";
import { transactionController } from "@/controllers/TransactionController";
import { getLogoByBankName } from "@/lib/banksUtils";
import { AccountInterface } from "@/models/account";
import { TransactionInterface } from "@/models/transaction";
import moment from "moment";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [barChartTransactions, setBarChartTransactions] = useState<BarChartTransaction[]>([]);
  
  useEffect(() => {
    accountController.setShowToast(false)
    
    const fetchAccounts = async () => {
      const accountsResponse = await accountController.getAccounts();
      setAccounts(accountsResponse ?? []);
    };
    fetchAccounts();

    transactionController.setShowToast(false);
    const fetchLastTransactions = async () => {
      const transactionsResponse = await transactionController.getTransactions({
        startDate: moment().startOf('M').toISOString(),
        endDate: moment().toISOString()
      });
      if (transactionsResponse) {
        setTransactions(transactionsResponse);
        const barChartData = transactionsResponse.map(transaction => ({
          data: moment(transaction.date).format('YYYY-MM-DD'),
          valor: transaction.amount,
        }));
        setBarChartTransactions(barChartData);
      }
    };
    fetchLastTransactions();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-color-1 font-bold">Dashboard</h1>
        <ApplyFiltersButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
       <AccountList accounts={accounts}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <BarChart transactions={barChartTransactions} />
        </div>
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <TransactionsList transactions={transactions.slice(0, 6)} />
        </div>
      </div>
    </>
  )
}