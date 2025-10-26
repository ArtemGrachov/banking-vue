import type { ITransaction } from '@/types/models/transaction';
import type { IPagination } from '@/types/other/pagination';

export interface IGetTransactionsQuery {
  page: number;
  itemsPerPage?: number;
}

export interface IGetTransactionsResponse {
  data: ITransaction[];
  pagination: IPagination;
}
