import { TransactionInterface } from "@/models/transaction"
import moment from "moment"
import 'moment/locale/pt-br'

export const groupByDate = (items: TransactionInterface[]) => {
  return items.reduce((acc, item) => {
    const date = moment(item.date).format('YYYY-MM-DD')
    acc[date] = acc[date] ? [...acc[date], item] : [item]
    return acc
  }, {} as Record<string, TransactionInterface[]>)
}

export const getMonthName = (monthIndex: number) => {
  return moment().month(monthIndex).format('MMMM')
}

export const filterTransactionsByMonth = (transactions: TransactionInterface[], year: number, month: number) => {
  return transactions.filter(t => {
    const date = moment(t.date)
    return date.year() === year && date.month() === month
  })
}

export const processTransactions = (transactions: TransactionInterface[]) => {
  const result: TransactionInterface[] = []
  for (const t of transactions) {
    if (t.type === "TRANSFERENCIA") {
      result.push({
        ...t,
        type: "DEBITO",
      })
      result.push({
        ...t,
        type: "CREDITO",
      })
    } else {
      result.push(t)
    }
  }
  return result
}