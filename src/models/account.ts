export interface AccountInterface {
  id?: string;
  name: string;
  type: AccountType;
  balance?: number;
}

export type AccountType = "CORRENTE" | "POUPANCA" | "CREDITO" |"INVESTIMENTO";