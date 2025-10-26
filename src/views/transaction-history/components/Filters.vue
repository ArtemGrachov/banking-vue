<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { TRANSACTION_CATEGORIES } from '@/constants/transactions';

import FormField from '@/components/forms/FormField.vue';
import Select from '@/components/inputs/Select.vue';
import Datepicker from '@/components/inputs/Datepicker.vue';
import { useCardsStore } from '@/store/cards';

const { t } = useI18n();
const { data: cards } = useCardsStore();

const cardOptions = computed(() => {
  return cards?.map(card => ({
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

const datepickerValue = ref(null);

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
        />
      </FormField>
    </div>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_transaction_history.filters.label_period') }}
        </template>
        <Datepicker v-model="datepickerValue" />
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
