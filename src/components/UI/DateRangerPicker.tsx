"use client"

import { useState } from "react"
import moment from "moment"
import { CalendarDays } from "lucide-react"

type DateRange = {
  dataInicio: string
  dataFim: string
}

type Props = {
  onChange: (range: DateRange) => void
}

export default function DateRangePicker({ onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [dataInicio, setDataInicio] = useState<string>("")
  const [dataFim, setDataFim] = useState<string>("")

  const handleApply = () => {
    if (dataInicio && dataFim) {
      onChange({
        dataInicio: moment(dataInicio).toISOString(),
        dataFim: moment(dataFim).toISOString(),
      })
      setOpen(false)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-white"
      >
        <CalendarDays className="w-4 h-4" />
        {dataInicio && dataFim
          ? `${moment(dataInicio).format("DD/MM/YYYY")} - ${moment(dataFim).format("DD/MM/YYYY")}`
          : "Filtrar por data"}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-[300px] bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md shadow-lg p-4">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                Início
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-md border dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                Fim
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-md border dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <button
              onClick={handleApply}
              disabled={!dataInicio || !dataFim}
              className="w-full bg-black text-white py-2 px-3 rounded-md text-sm font-medium dark:bg-white dark:text-black disabled:opacity-50"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}