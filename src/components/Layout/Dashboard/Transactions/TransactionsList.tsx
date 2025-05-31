"use client";

import { TransactionInterface } from "@/models/transaction";
import TransactionItem from "./TransactionsItem";

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    name: "Pix José",
    email: "jose@email.com",
    type: "entrada",
    amount: 1999.0,
  },
  {
    id: 2,
    name: "Lanche RU",
    email: "ru@email.com",
    type: "saida",
    amount: 39.0,
  },
  {
    id: 3,
    name: "Transferência Entrada",
    email: "eu@email.com",
    type: "entrada",
    amount: 299.0,
  },
  {
    id: 4,
    name: "Transferência Saída",
    email: "eu@email.com",
    type: "saida",
    amount: 299.0,
  },
  {
    id: 5,
    name: "Transferência Entrada",
    email: "eu@email.com",
    type: "entrada",
    amount: 299.0,
  },
  {
    id: 6,
    name: "Transferência Saída",
    email: "eu@email.com",
    type: "saida",
    amount: 300.0,
  },
];

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
        Você fez {transactions.length} transações esse mês
      </p>

      <div className="space-y-4">
        {transactions.slice(0,5).map((t) => {
          const visualType = t.type === "DEBITO" ? "saida" : "entrada";
          const email =
            t.type === "DEBITO"
              ? `Origem: ${t.accountOriginId || "N/A"}`
              : t.type === "CREDITO"
              ? `Destino: ${t.accountDestinationId || "N/A"}`
              : "N/A";

          return (
            <TransactionItem
              id={t.id}
              key={`${t.id}-${t.type}`}
              name={t.description || visualType}
              email={email}
              type={visualType as "entrada" | "saida"}
              amount={t.amount}
              className="rounded-2xl p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => console.log(`Clicked transaction ${t.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
