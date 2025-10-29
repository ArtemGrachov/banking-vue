import { watch } from 'vue';
import { useRoute } from 'vue-router';

import { useStatsStore } from '../store/stats';
import { useFilterStore } from '../store/filter';

import { useRouteQueryToForm } from './route-query-to-form';
import { useGetErrorMessage } from '@/composables/common/get-error-message';
import { useToast } from '@/composables/toast/toast';

import type { IFilterForm } from '../types/filter';

export const useData = () => {
  const route = useRoute();
  const toast = useToast();
  const statsStore = useStatsStore();
  const getErrorMessage = useGetErrorMessage();
  const filterStore = useFilterStore();
  const routeQueryToForm = useRouteQueryToForm();

  const init = async () => {
    const queryFormValue = routeQueryToForm(route.query);
    filterStore.setValue(queryFormValue);
    await getStatsData(queryFormValue);
  }

  const getStatsData = async (formValue: IFilterForm, reset = false) => {
    if (statsStore.isProcessing) {
      return;
    }

    try {
      await statsStore.getStats({
        cards: formValue.cards,
        categories: formValue.categories,
        periodFrom: formValue.timePeriod?.[0],
        periodTo: formValue.timePeriod?.[1],
        currency: formValue.currency,
      });
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err));
    }
  }

  watch(route, (newValue) => {
    const queryFormValue = routeQueryToForm(newValue.query);
    filterStore.setValue(queryFormValue);
    getStatsData(queryFormValue, true);
  });

  return {
    init,
    getStatsData,
  };
}