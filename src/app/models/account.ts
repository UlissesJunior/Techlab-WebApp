export interface AccountInterface {
  name: string;
  type: AccountType;
  balance?: number;
}

export type AccountType = "CORRENTE" | "POUPANCA" | "CREDITO" |"INVESTIMENTO";