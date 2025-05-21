"use client"

import { useState } from "react"
import { Plus, X, ArrowDownLeft, ArrowUpRight, RefreshCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const operations = [
  {
    icon: <ArrowUpRight className="text-green-500" />,
    label: "Adicionar receita",
    onClick: () => console.log("Receita"),
    hoverShadow: "hover:shadow-[0_0_20px_4px_rgba(34,197,94,0.5)]",
  },
  {
    icon: <ArrowDownLeft className="text-red-500" />,
    label: "Adicionar despesa",
    onClick: () => console.log("Despesa"),
    hoverShadow: "hover:shadow-[0_0_20px_4px_rgba(239,68,68,0.5)]",
  },
  {
    icon: <RefreshCcw className="text-purple-500" />,
    label: "Transferência",
    onClick: () => console.log("Transferência"),
    hoverShadow: "hover:shadow-[0_0_20px_4px_rgba(168,85,247,0.5)]",
  },
]

export default function OperationsButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center z-50 gap-3">
      <div className="flex flex-col items-center gap-2 transition-all">
        {operations.map((operation, index) => (
          <div className="relative group" key={index}>
            <div
              className={cn(
                "absolute right-full mr-2 top-1/2 -translate-y-1/2 transition-opacity text-sm bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white rounded-md px-3 py-1 shadow-lg z-10 whitespace-nowrap",
                open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                "md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
              )}
            >
              {operation.label}
            </div>

            <button
              onClick={operation.onClick}
              style={{
                transition: "all 0.35s ease-in-out",
                transitionDelay: `${index * 70}ms`,
              }}
              className={cn(
                "p-3 rounded-full bg-white dark:bg-neutral-900 shadow-md transition-all cursor-pointer",
                open
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-3 pointer-events-none",
                operation.hoverShadow
              )}
            >
              {operation.icon}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95 cursor-pointer"
        aria-label="Abrir operações"
      >
        {open ? <X /> : <Plus />}
      </button>
    </div>
  )
}