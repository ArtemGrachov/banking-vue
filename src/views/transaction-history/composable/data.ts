import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useTransactionsStore } from '../store/transactions';
import { useFilterStore } from '../store/filter';

import { useRouteQueryToForm } from './route-query-to-form';
import { useGetErrorMessage } from '@/composables/common/get-error-message';
import { useToast } from '@/composables/toast/toast';

import type { IFilterForm } from '@/views/transaction-history/types/filter';

export const useData = () => {
  const route = useRoute();
  const toast = useToast();
  const transactionsStore = useTransactionsStore();
  const getErrorMessage = useGetErrorMessage();
  const filterStore = useFilterStore();
  const routeQueryToForm = useRouteQueryToForm();

  const init = async () => {
    const queryFormValue = routeQueryToForm(route.query);
    filterStore.setValue(queryFormValue);
    await getTransactionsData(queryFormValue);
  }

  const getTransactionsData = async (formValue: IFilterForm, reset = false) => {
    if (transactionsStore.isProcessing) {
      return;
    }

    try {
      await transactionsStore.getTransactions({
        itemsPerPage: 20,
        page: formValue.page,
        cards: formValue.cards,
        categories: formValue.categories,
        periodFrom: formValue.timePeriod?.[0],
        periodTo: formValue.timePeriod?.[1],
      }, reset);
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    }
  }

  const nextPage = () => {
    const totalPages = transactionsStore.data?.pagination.totalPages ?? 1;
    const newPage = (transactionsStore.data?.pagination.currentPage ?? 0) + 1;

    if (newPage > totalPages) {
      return;
    }

    filterStore.setValue({ page: newPage });
    getTransactionsData(filterStore.formValue, false);
  }

  watch(route, (newValue) => {
    const queryFormValue = routeQueryToForm(newValue.query);
    filterStore.setValue(queryFormValue);
    getTransactionsData(queryFormValue, true);
  });

  return {
    init,
    nextPage,
    getTransactionsData,
  };
}