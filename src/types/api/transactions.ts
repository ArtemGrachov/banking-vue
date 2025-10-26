import type { ITransaction } from '@/types/models/transaction';
import type { IPagination } from '@/types/other/pagination';

export interface IGetTransactionsQuery {
  page?: number | null;
  itemsPerPage?: number | null;
  cards?: number[] | null;
  categories?: string[] | null;
  periodFrom?: string | null;
  periodTo?: string | null;
}

export interface IGetTransactionsResponse {
  data: ITransaction[];
  pagination: IPagination;
}
