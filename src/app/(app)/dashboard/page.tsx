"use client"

import { BarChart } from "@/components/Layout/Dashboard/Charts/BarChart";
import TransactionsList from "@/components/Layout/Dashboard/Transactions/TransactionsList";
import { Navbar } from "@/components/Layout/Navbar/Navbar";
import ApplyFiltersButton from "@/components/UI/ApplyFiltersButton";
import { BalanceCard } from "@/components/UI/BalanceCard";
import OperationsButton from "@/components/UI/OperationsButton";
import { getLogoByBankName } from "@/lib/banksUtils";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-color-1 font-bold">Dashboard</h1>
        <ApplyFiltersButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <BalanceCard
          title="Saldo Total"
          icon="$"
          value="R$ 42.351,60"
          percentage={"15.8"}
        />

        <BalanceCard
          title="Nubank"
          icon={getLogoByBankName("nubank")}
          value="R$ 17.364,16"
          percentage="41.0"
          bank="nubank"
          metallic
        />

        <BalanceCard
          title="Itaú"
          icon={getLogoByBankName("itau")}
          value="R$ 12.028,65"
          percentage="28.4"
          bank="itau"
          metallic
        />

        <BalanceCard
          title="Bradesco"
          icon={getLogoByBankName("bradesco")}
          value="R$ 8.046,80"
          percentage="19.0"
          bank="bradesco"
          metallic
        />

        <BalanceCard
          title="Santander"
          icon={getLogoByBankName("santander")}
          value="R$ 4.911,99"
          percentage="11.6"
          bank="santander"
          metallic
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <BarChart transactions={[
            { data: "2023-01-20", valor: 200 },
            { data: "2023-01-21", valor: 300 },
            { data: "2023-02-09", valor: 400 },
          ]} />
        </div>
        <div className="bg-background-3 rounded-2xl p-6 shadow-md">
          <TransactionsList />
        </div>
      </div>
    </>
  )
}