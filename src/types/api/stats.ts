import type { ETransactionCategory } from '@/constants/transactions';

export interface IGetStatsQuery {
  currency: string;
  cards?: number[] | null;
  categories?: string[] | null;
  periodFrom?: string | null;
  periodTo?: string | null;
}

export type CardStats = Record<number, number>;
export type CategoriesStats = Record<ETransactionCategory, number>;

export interface IStats {
  cards: CardStats;
  categories: CategoriesStats;
  cardsTotal: number;
  categoriesTotal: number;
}

export interface IGetStatsResponse {
  income: IStats;
  outcome: IStats;
  noData?: boolean;
}
