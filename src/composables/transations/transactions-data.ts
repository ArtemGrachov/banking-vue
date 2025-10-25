import { ref } from 'vue';

import { EStatus } from '@/constants/status';

import type { ITransaction } from '@/types/models/transaction';
import type { IGetTransationsQuery } from '@/types/api/transations';

import { mockRequest } from '@/utils/mock-request';

export const useTransactionsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<ITransaction[] | null>(null);

  const getTransactions = async (query: IGetTransationsQuery) => {
    try {
      getStatus.value = EStatus.PROCESSING;

      const transations = await import('@/mock-data/transactions.json').then(m => m.default as ITransaction[]);
      let response = await mockRequest<ITransaction[]>(transations);

      if (query?.itemsPerPage) {
        response = response?.slice(0, query.itemsPerPage);
      }

      getStatus.value = EStatus.SUCCESS;
      data.value = response ?? null;

      return response;
    } catch (err) {
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  return {
    getStatus,
    data,
    getTransactions,
  };
}
