import { AccountInterface } from "./account";

export interface TransactionInterface {
  id?: string;
  type: TransactionType;
  accountOriginId?: string;
  accountDestinationId?: string;
  amount: number;
  description?: string;
  date?: Date;
}

export interface TransactionResponse {
  id: string;
  type: TransactionType; 
  accountOrigin: AccountInterface | null;
  accountDestination: AccountInterface | null;
  amount: number;
  description: string;
  date: string; 
  createdAt: string; 
}
export type TransactionType = "DEBITO" | "CREDITO" | "TRANSFERENCIA";