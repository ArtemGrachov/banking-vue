import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { EStatus } from '@/constants/status';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { ITransaction } from '@/types/models/transaction';
import type { IGetTransactionsQuery, IGetTransactionsResponse } from '@/types/api/transactions';

import { mockPaginationRequest, mockRequest } from '@/utils/mock-request';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useTransactionsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<IGetTransactionsResponse | null | undefined>(null);
  const list = ref<ITransaction[]>([]);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const getTransactions = async (query: IGetTransactionsQuery, reset: boolean = false) => {
    try {
      if (reset) {
        list.value = [];
      }

      getStatus.value = EStatus.PROCESSING;

      const rawData = await import('@/mock-data/transactions.json').then(m => m.default as ITransaction[]);
      let transactions = (await mockRequest<ITransaction[]>(rawData))!;

      if (query.cards?.length) {
        const set = new Set(query.cards);
        transactions = transactions.filter(t => set.has(t.cardId));
      }

      if (query.categories?.length) {
        const set = new Set(query.categories);
        transactions = transactions.filter(t => set.has(t.category));
      }

      if (query.periodFrom) {
        transactions = transactions.filter(t => dayjs(t.dateTime).isSameOrAfter(query.periodFrom));
      }

      if (query.periodTo) {
        transactions = transactions.filter(t => dayjs(t.dateTime).isSameOrBefore(query.periodTo));
      }

      data.value = await mockPaginationRequest<IGetTransactionsResponse, ITransaction>(
        query.page ?? 1,
        query.itemsPerPage ?? 10,
        transactions,
      );

      list.value = [
        ...list.value,
        ...(data.value?.data ?? []),
      ];

      getStatus.value = EStatus.SUCCESS;
      statusMessage.value = null;

      return data.value;
    } catch (err) {
      statusMessage.value = getErrorMessage(err);
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  const clear = () => {
    getStatus.value = EStatus.INIT;
    data.value = null;
    list.value = [];
  }

  const isInit = computed(() => {
    return getStatus.value === EStatus.INIT;
  });

  const isProcessing = computed(() => {
    return getStatus.value === EStatus.PROCESSING;
  });

  const isSuccess = computed(() => {
    return getStatus.value === EStatus.SUCCESS;
  });

  const isEmpty = computed(() => {
    return isSuccess.value && !data.value?.data?.length;
  });

  const isError = computed(() => {
    return getStatus.value === EStatus.ERROR;
  });

  return {
    getStatus,
    data,
    list,
    isInit,
    isProcessing,
    isSuccess,
    isEmpty,
    isError,
    statusMessage,
    getTransactions,
    clear,
  };
}
