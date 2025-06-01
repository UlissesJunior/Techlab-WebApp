"use client";

import { TransactionInterface, TransactionResponse } from "@/models/transaction";
import TransactionItem from "./TransactionsItem";

export default function TransactionsList({
  transactions,
}: {
  transactions: TransactionInterface[];
}) {
  return (
    //max-w-2xl p-6
    <div className="bg-background-3 rounded-xl p-2 w-full dark:shadow-none">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Transações Recentes
      </h2>
      <p className="text-sm text-gray-500 dark:text-muted-foreground mb-4">
        Você fez {transactions.length} {transactions.length === 1 ? "transação" : "transações"} esse mês
      </p>

      <div className="space-y-4">
        {transactions.slice(0,5).map((t) => {
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
              className="rounded-2xl p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
