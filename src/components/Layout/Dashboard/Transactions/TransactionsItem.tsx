import { cn } from "@/lib/utils"

type Props = {
  name: string
  email: string
  type: "entrada" | "saida"
  amount: number
}

export default function TransactionItem({ name, email, type, amount }: Props) {
  const isEntrada = type === "entrada"

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-800 text-gray-900 dark:text-white flex items-center justify-center font-bold text-sm uppercase">
          {name[0]}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="text-xs text-gray-500 dark:text-muted-foreground">
            {email}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "text-sm font-semibold",
          isEntrada ? "text-green-500" : "text-red-500"
        )}
      >
        {isEntrada ? "+" : "-"}R${amount.toFixed(2)}
      </p>
    </div>
  )
}