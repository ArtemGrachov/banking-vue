import type { ETransactionCategory, ETransationsType } from '@/constants/transactions';

export interface ITransaction {
  id: number;
  type: ETransationsType;
  sender: string | null;
  recipient: string | null;
  dateTime: string;
  amount: number;
  currency: string;
  category: ETransactionCategory;
}
