<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { TRANSACTION_CATEGORIES } from '@/constants/transactions';

import { useCardsStore } from '@/store/cards';
import { useFilterStore } from '../store/filter';

import { useFormToRouteQuery } from '../composable/form-to-route-query';

import FormField from '@/components/forms/FormField.vue';
import Select from '@/components/inputs/Select.vue';
import Datepicker from '@/components/inputs/Datepicker.vue';

import type { IFilterForm } from '../types/filter';

type Emits = {
  (e: 'select'): void;
}

const emits = defineEmits<Emits>();

const { t } = useI18n();
const cardsStore = useCardsStore();
const router = useRouter();
const formToRouteQuery = useFormToRouteQuery();
const filterStore = useFilterStore();

const fieldCards = ref<number[]>([]);
const fieldCategories = ref<string[]>([]);
const fieldTimePeriod = ref<[string, string] | null>(null);
const fieldCurrency = ref<string>('USD');

const cardOptions = computed(() => {
  return cardsStore.data?.map(card => ({
    id: card.id,
    label: card.cardNumber,
  }));
});

const currencies = computed(() => {
  const set = (cardsStore.data ?? []).reduce((acc, curr) => {
    acc.add(curr.currency)
    return acc;
  }, new Set<string>());

  return Array.from(set);
});

const currenciesOptions = computed(() => {
  return currencies.value.map(currency => {
    return {
      currency,
    }
  })
});

const categoryOptions = computed(() => {
  const result = TRANSACTION_CATEGORIES.map(category => {
    return {
      category,
      label: t(`common_transactions.categories.${category}`),
    };
  });

  return result;
});

const updateHandler = () => {
  const newFormValue: IFilterForm = {
    cards: fieldCards.value,
    categories: fieldCategories.value,
    timePeriod: fieldTimePeriod.value,
    currency: fieldCurrency.value,
  };

  const newQuery = formToRouteQuery(newFormValue);

  router.push({ query: newQuery });
  emits('select');
}

watch(() => filterStore.formValue, () => {
  fieldCards.value = filterStore.formValue.cards ?? [];
  fieldCategories.value = filterStore.formValue.categories ?? [];
  fieldTimePeriod.value = filterStore.formValue.timePeriod;
}, { immediate: true });
</script>

<template>
  <form class="filters" @submit.prevent>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_charts.filters.label_currency') }}
        </template>
        <Select
          :options="currenciesOptions"
          track-by="currency"
          label="currency"
          :multiple="false"
          :searchable="false"
          :input-label="$t('view_charts.filters.label_currency')"
          v-model="fieldCurrency"
          @select="updateHandler"
          @remove="updateHandler"
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_charts.filters.label_card') }}
        </template>
        <Select
          :options="cardOptions"
          track-by="id"
          label="label"
          :multiple="true"
          :searchable="false"
          :input-label="$t('view_charts.filters.label_card')"
          :allow-empty="true"
          v-model="fieldCards"
          @select="updateHandler"
          @remove="updateHandler"
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_charts.filters.label_category') }}
        </template>
        <Select
          :options="categoryOptions"
          track-by="category"
          label="label"
          :multiple="true"
          :searchable="false"
          :allow-empty="true"
          :input-label="$t('view_charts.filters.label_category')"
          v-model="fieldCategories"
          @select="updateHandler"
          @remove="updateHandler"
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_charts.filters.label_period') }}
        </template>
        <Datepicker
          v-model="fieldTimePeriod"
          :range="true"
          :enable-time-picker="false"
          :multi-calendars="true"
          :input-label="$t('view_charts.filters.label_period')"
          format="yyyy.MM.dd"
          @select="updateHandler"
        />
      </FormField>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.filters {
  @include breakpoints.sm() {
    display: flex;
    gap: 32px;
  }
}

.cell {
  @include breakpoints.sm() {
    flex: 1 1 0;
  }
}
</style>
