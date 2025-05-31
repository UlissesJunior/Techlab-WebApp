"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { TransactionInterface } from "@/models/transaction";
import { transactionController } from "@/controllers/TransactionController";
import moment from "moment";
import { BarChartTransaction } from "@/components/Layout/Dashboard/Charts/BarChart";

interface TransactionsContextType {
  transactions: TransactionInterface[];
  barChartData: BarChartTransaction[];
  isLoading: boolean;
  error: string | null;
  fetchTransactions: (params?: { 
    accountId?: string; 
    startDate?: string; 
    endDate?: string 
  }) => Promise<void>;
  createTransaction: (data: Omit<TransactionInterface, "id" | "date">) => Promise<TransactionInterface | null>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async (params?: { 
    accountId?: string; 
    startDate?: string; 
    endDate?: string 
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      transactionController.setShowToast(false);
      const data = await transactionController.getTransactions({
        startDate: params?.startDate || moment().startOf("month").toISOString(),
        endDate: params?.endDate || moment().endOf("day").toISOString(),
        accountId: params?.accountId
      });

      if (data) {
        setTransactions(data);
        
        const chartData = data.map(t => ({
            data: moment(t.date).format("YYYY-MM-DD"), 
            valor: t.amount
        }));
        setBarChartData(chartData);
      }
    } catch (err) {
      setError("Erro ao carregar transações");
      console.error(err);
    } finally {
      setIsLoading(false);
      transactionController.setShowToast(true);
    }
  };

  const createTransaction = async (data: Omit<TransactionInterface, "id" | "date">) => {
    setIsLoading(true);
    try {
      const newTransaction = await transactionController.createTransaction(data);
      if (newTransaction) {
        await fetchTransactions();
      }
      return newTransaction;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider 
      value={{ 
        transactions, 
        barChartData, 
        isLoading, 
        error, 
        fetchTransactions, 
        createTransaction 
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};