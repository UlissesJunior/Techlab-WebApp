export interface TransactionInterface {
  id: string;
  type: TransactionType;
  accountOriginId?: string;
  accountDestinationId?: string;
  amount: number;
  description?: string;
  date?: Date;
}

export type TransactionType = "DEBITO" | "CREDITO" | "TRANSFERENCIA";