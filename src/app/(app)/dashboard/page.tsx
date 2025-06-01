"use client"

import { AccountList } from "@/components/Layout/Dashboard/AccountList/AccountList";
import { BarChart } from "@/components/Layout/Dashboard/Charts/BarChart";
import TransactionsList from "@/components/Layout/Dashboard/Transactions/TransactionsList";
import ApplyFiltersButton from "@/components/UI/ApplyFiltersButton";
import { BalanceCard } from "@/components/UI/BalanceCard";
import { useAccounts } from "@/contexts/AccountsContext";
import { useTransactions } from "@/contexts/TransactionsContext";
import FilterDialog from "@/dialogs/FilterDialog";
import { formatAmount } from "@/lib/transactionDialogUtils";
import { processTransactions } from "@/lib/transactionsPageUtils";
import { useState } from "react";

export default function DashboardPage() {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const { accounts, totalAmount, fetchAccounts } = useAccounts();
  const { transactions, barChartData } = useTransactions();

  const transactionsListData = processTransactions(transactions)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-color-1 font-bold">Dashboard</h1>
        <ApplyFiltersButton onClick={() => setIsFilterDialogOpen(true)}/>
        <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <BalanceCard
          title="Saldo Total"
          icon="$"
          value={formatAmount(totalAmount.toString())}
          type=""
        />
       <AccountList accounts={accounts} fetchAccounts={fetchAccounts}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <BarChart transactions={barChartData} />
        </div>
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <TransactionsList transactions={transactionsListData} />
        </div>
      </div>
    </>
  )
}