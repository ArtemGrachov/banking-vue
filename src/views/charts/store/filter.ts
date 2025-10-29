import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { IFilterForm } from '../types/filter';

export const useFilterStore = defineStore('view-transactions-history/filter', () => {
  const formValue = ref<IFilterForm>({
    cards: null,
    categories: null,
    timePeriod: null,
    currency: 'USD',
  });

  const setValue = (newFormValue: Partial<IFilterForm>) => {
    formValue.value = {
      ...formValue.value,
      ...newFormValue,
    };
  }

  return {
    formValue,
    setValue,
  };
});
