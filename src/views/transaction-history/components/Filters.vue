<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

import { TRANSACTION_CATEGORIES } from '@/constants/transactions';

import { useCardsStore } from '@/store/cards';

import FormField from '@/components/forms/FormField.vue';
import Select from '@/components/inputs/Select.vue';
import Datepicker from '@/components/inputs/Datepicker.vue';

const { t } = useI18n();
const cardsStore = useCardsStore();
const router = useRouter();

const DATETIME_QUERY_FORMAT = 'YYYY-MM-DD';

const fieldCards = ref<number[]>([]);
const fieldCategories = ref<string[]>([]);
const fieldTimePeriod = ref<[string, string] | null>(null);

const cardOptions = computed(() => {
  return cardsStore.data?.map(card => ({
    id: card.id,
    label: card.cardNumber,
  }));
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
  const cardsValue = fieldCards.value;
  const categoriesValue = fieldCategories.value;
  const timePeriodValueFrom = fieldTimePeriod.value?.[0];
  const timePeriodValueTo = fieldTimePeriod.value?.[1];

  const isPeriodSelected = timePeriodValueFrom && timePeriodValueTo;

  const query = {
    cards: cardsValue ? cardsValue : undefined,
    categories: categoriesValue ? categoriesValue : undefined,
    time_period_from: isPeriodSelected ? dayjs(timePeriodValueFrom).format(DATETIME_QUERY_FORMAT) : undefined,
    time_period_to: isPeriodSelected ? dayjs(timePeriodValueTo).format(DATETIME_QUERY_FORMAT) : undefined,
  };

  router.push({
    query,
  });
}
</script>

<template>
  <form class="filters" @submit.prevent>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_transaction_history.filters.label_card') }}
        </template>
        <Select
          :options="cardOptions"
          track-by="id"
          label="label"
          :multiple="true"
          v-model="fieldCards"
          @select="updateHandler"
          @remove="updateHandler"
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_transaction_history.filters.label_category') }}
        </template>
        <Select
          :options="categoryOptions"
          track-by="category"
          label="label"
          :multiple="true"
          v-model="fieldCategories"
          @select="updateHandler"
          @remove="updateHandler"
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_transaction_history.filters.label_period') }}
        </template>
        <Datepicker
          v-model="fieldTimePeriod"
          :range="true"
          :enable-time-picker="false"
          :multi-calendars="true"
          format="yyyy.MM.dd"
          @select="updateHandler"
        />
      </FormField>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 32px;
}

.cell {
  flex: 1 1 0;
}
</style>
