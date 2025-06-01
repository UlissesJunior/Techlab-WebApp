"use client";

import { useEffect, useState } from "react";
import TransactionItem from "@/components/Layout/Dashboard/Transactions/TransactionsItem";
import moment from "moment";
import "moment/locale/pt-br";
import {
  groupByDate,
  getMonthName,
  filterTransactionsByMonth,
  processTransactions,
} from "@/lib/transactionsPageUtils";
import { TransactionInterface, TransactionResponse } from "@/models/transaction";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TransactionDialog from "@/dialogs/TransactionDialog";
import { transactionController } from "@/controllers/TransactionController";
import ApplyFiltersButton from "@/components/UI/ApplyFiltersButton";
import FilterDialog from "@/dialogs/FilterDialog";

interface TransactionsPageProps {}

export default function TransactionsPage({}: TransactionsPageProps) {
  const today = moment();
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [currentMonth, setCurrentMonth] = useState({
    year: today.year(),
    month: today.month(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await transactionController.getTransactions({});
      setTransactions(data ?? []);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const date = moment()
        .year(prev.year)
        .month(prev.month)
        .subtract(1, "month");
      return { year: date.year(), month: date.month() };
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const date = moment().year(prev.year).month(prev.month).add(1, "month");
      return { year: date.year(), month: date.month() };
    });
  };

  const processedTransactions = processTransactions(transactions);
  const filteredTransactions = filterTransactionsByMonth(
    processedTransactions,
    currentMonth.year,
    currentMonth.month
  );
  const grouped = groupByDate(filteredTransactions);
  const displayMonth = getMonthName(currentMonth.month);
  const showYear = currentMonth.year !== today.year();

  const handleTransactionClick = (transaction: TransactionResponse) => {
    setSelectedTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Minhas Transações
      </h1>
      <ApplyFiltersButton onClick={() => setIsFilterDialogOpen(true)}/>
      <FilterDialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false) } isTransactionsPage={true} setTransactions={setTransactions} />
      </div>
      <div className="flex items-center sm:justify-center justify-between gap-4 sm:w-[300px] max-w-full w-full mx-auto">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 sm:bg-transparent dark:sm:bg-transparent hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer text-color-1"
          aria-label="Mês anterior"
        >
          <ArrowLeft />
        </button>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300 capitalize">
          {displayMonth}
          {showYear ? `/${currentMonth.year}` : ""}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full bg-gray-200 dark:bg-neutral-700 sm:bg-transparent dark:sm:bg-transparent hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer text-color-1"
          aria-label="Próximo mês"
        >
          <ArrowRight />
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-600 dark:text-gray-400">
          Carregando transações...
        </p>
      ) : filteredTransactions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          Nenhuma transação neste mês.
        </p>
      ) : (
        Object.entries(grouped).map(([date, transactions]) => (
          <div key={date} className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {moment(date).format("dddd, DD/MM")}
            </h2>
            <div className="space-y-2">
              {transactions.map((t) => {
                const visualType = t.type === "DEBITO" ? "saida" : "entrada";
                const c = (t as unknown as TransactionResponse)
                const conta =
                  c.type === "DEBITO"
                    ? `Conta de Origem: ${c.accountOrigin?.name || "N/A"}`
                    : t.type === "CREDITO"
                    ? `Conta de Destino: ${c.accountDestination?.name || "N/A"}`
                    : "N/A";

                return (
                  <TransactionItem
                    id={t.id}
                    key={`${t.id}-${t.type}`}
                    name={t.description || visualType}
                    email={conta}
                    type={visualType as "entrada" | "saida"}
                    amount={t.amount}
                    className="rounded-2xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                    onClick={() => handleTransactionClick(t as unknown as TransactionResponse)}
                  />
                );
              })}
            </div>
          </div>
        ))
      )}

      {selectedTransaction && (
        <TransactionDialog
          type={selectedTransaction.type}
          open={dialogOpen}
          onClose={handleDialogClose}
          onSubmit={(data: any) => console.log("Submit", data)}
          isViewing={true}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}