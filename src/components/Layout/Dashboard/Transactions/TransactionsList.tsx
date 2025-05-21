"use client"

import TransactionItem from "./TransactionsItem"

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
]

export default function TransactionsList() {
  return (
    //max-w-2xl p-6
    <div className="bg-background-3 rounded-xl p-2 w-full dark:shadow-none">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Transações Recentes
      </h2>
      <p className="text-sm text-gray-500 dark:text-muted-foreground mb-4">
        Você fez {MOCK_TRANSACTIONS.length} transações esse mês
      </p>

      <div className="space-y-4">
        {MOCK_TRANSACTIONS.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  )
}