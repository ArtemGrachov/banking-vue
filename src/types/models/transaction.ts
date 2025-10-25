import type { ETransactionCategory, ETransactionsType } from '@/constants/transactions';

export interface ITransaction {
  id: number;
  type: ETransactionsType;
  sender: string | null;
  recipient: string | null;
  dateTime: string;
  amount: number;
  currency: string;
  category: ETransactionCategory;
}
