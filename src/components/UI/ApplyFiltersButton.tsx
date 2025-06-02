"use client"

import { Filter } from "lucide-react"

interface ApplyFilterButtonProps {
  onClick: () => void;
}

export default function ApplyFilterButton({ onClick }: ApplyFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex text-color-1 items-center cursor-pointer gap-2 rounded-md border px-4 py-2 text-sm font-medium border-border shadow-sm hover:bg-gray-100 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-white"
    >
      Aplicar filtros
      <Filter className="w-4 h-4 ext-color-1" />
    </button>
  )
}