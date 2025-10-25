import { computed, ref } from 'vue';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { ITransaction } from '@/types/models/transaction';
import type { IGetTransationsQuery } from '@/types/api/transations';

import { mockRequest } from '@/utils/mock-request';

export const useTransactionsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<ITransaction[] | null>(null);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const getTransactions = async (query: IGetTransationsQuery) => {
    try {
      getStatus.value = EStatus.PROCESSING;

      const transations = await import('@/mock-data/transactions.json').then(m => m.default as ITransaction[]);
      let response = await mockRequest<ITransaction[]>(transations);

      if (query?.itemsPerPage) {
        response = response?.slice(0, query.itemsPerPage);
      }

      getStatus.value = EStatus.SUCCESS;
      statusMessage.value = null;
      data.value = response ?? null;

      return response;
    } catch (err) {
      statusMessage.value = getErrorMessage(err);
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  const isSuccess = computed(() => {
    return getStatus.value === EStatus.SUCCESS;
  });

  const isEmpty = computed(() => {
    return isSuccess.value && !data.value?.length;
  });

  const isError = computed(() => {
    return getStatus.value === EStatus.ERROR;
  });

  return {
    getStatus,
    data,
    isSuccess,
    isEmpty,
    isError,
    statusMessage,
    getTransactions,
  };
}
