"use client"

import React from "react";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import OperationsButton from "@/components/UI/OperationsButton";
import { AccountsProvider } from "@/contexts/AccountsContext";
import { TransactionsProvider } from "@/contexts/TransactionsContext";
import { ProtectedRoute } from "@/contexts/ProtectedRoutesContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedRoute>
        <AccountsProvider>
          <TransactionsProvider>
            <Navbar />
            <main className="p-6 md:p-8 lg:p-10 xl:p-12 bg-background text-white">
              {children}
            </main>
            <OperationsButton />
          </TransactionsProvider>
        </AccountsProvider>
      </ProtectedRoute>
    </>
  );
}
