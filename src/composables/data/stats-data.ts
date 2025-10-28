import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { EStatus } from '@/constants/status';
import { ETransactionsType } from '@/constants/transactions';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import type { ITransaction } from '@/types/models/transaction';
import type {
  CardStats,
  CategoriesStats,
  IGetStatsQuery,
  IGetStatsResponse,
} from '@/types/api/stats';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const useStatsData = () => {
  const getStatus = ref(EStatus.INIT);
  const data = ref<IGetStatsResponse | null | undefined>(null);
  const statusMessage = ref<string | null>(null);
  const getErrorMessage = useGetErrorMessage();

  const getStats = async (query: IGetStatsQuery) => {
    try {
      getStatus.value = EStatus.PROCESSING;

      let transactions = await import('@/mock-data/transactions.json').then(m => m.default as ITransaction[]);

      transactions = transactions.filter(t => t.currency === query.currency);

      if (query?.cards?.length) {
        const set = new Set(query.cards);
        transactions = transactions.filter(t => set.has(t.cardId));
      }

      if (query?.categories?.length) {
        const set = new Set(query.categories);
        transactions = transactions.filter(t => set.has(t.category));
      }

      if (query?.periodFrom) {
        transactions = transactions.filter(t => dayjs(t.dateTime).isSameOrAfter(query.periodFrom));
      }

      if (query?.periodTo) {
        transactions = transactions.filter(t => dayjs(t.dateTime).isSameOrBefore(query.periodTo));
      }

      getStatus.value = EStatus.SUCCESS;
      statusMessage.value = null;

      const outcomeTransactions = transactions.filter(t => t.type === ETransactionsType.OUTCOME);
      const incomeTransactions = transactions.filter(t => t.type === ETransactionsType.INCOME);

      const outcomeByCards = outcomeTransactions.reduce((acc, curr) => {
        acc[curr.cardId] = (acc[curr.cardId] ?? 0) + curr.amount;
        return acc;
      }, {} as CardStats);
      const outcomeByCardsTotal = Object.values(outcomeByCards).reduce((acc, curr) => acc + curr, 0);

      const outcomeByCategories = outcomeTransactions.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] ?? 0) + curr.amount;
        return acc;
      }, {} as CategoriesStats);
      const outcomeByCategoriesTotal = Object.values(outcomeByCategories).reduce((acc, curr) => acc + curr, 0);

      const incomeByCards = incomeTransactions.reduce((acc, curr) => {
        acc[curr.cardId] = (acc[curr.cardId] ?? 0) + curr.amount;
        return acc;
      }, {} as CardStats);
      const incomeByCardsTotal = Object.values(incomeByCards).reduce((acc, curr) => acc + curr, 0);

      const incomeByCategories = incomeTransactions.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] ?? 0) + curr.amount;
        return acc;
      }, {} as CategoriesStats);
      const incomeByCategoriesTotal = Object.values(incomeByCategories).reduce((acc, curr) => acc + curr, 0);

      const result: IGetStatsResponse = {
        income: {
          cards: incomeByCards,
          categories: incomeByCategories,
          cardsTotal: incomeByCardsTotal,
          categoriesTotal: incomeByCategoriesTotal,
        },
        outcome: {
          cards: outcomeByCards,
          categories: outcomeByCategories,
          cardsTotal: outcomeByCardsTotal,
          categoriesTotal: outcomeByCategoriesTotal,
        },
        noData: transactions.length === 0,
      };

      return data.value = result;
    } catch (err) {
      statusMessage.value = getErrorMessage(err);
      getStatus.value = EStatus.ERROR;
      throw err;
    }
  }

  const clear = () => {
    getStatus.value = EStatus.INIT;
    data.value = null;
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

  const isError = computed(() => {
    return getStatus.value === EStatus.ERROR;
  });

  const isEmpty = computed(() => {
    return Boolean(data.value?.noData);
  });

  return {
    getStatus,
    data,
    isInit,
    isProcessing,
    isSuccess,
    isError,
    isEmpty,
    statusMessage,
    getStats,
    clear,
  };
}
