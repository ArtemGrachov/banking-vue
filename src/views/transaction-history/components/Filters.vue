<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { TRANSACTION_CATEGORIES } from '@/constants/transactions';

import FormField from '@/components/forms/FormField.vue';
import Select from '@/components/inputs/Select.vue';

const { t } = useI18n();

const categoryOptions = computed(() => {
  const result = TRANSACTION_CATEGORIES.map(category => {
    return {
      category,
      label: t(`common_transactions.categories.${category}`),
    };
  });

  return result;
});

</script>

<template>
  <form class="filters" @submit.prevent>
    <div class="cell">
      <FormField>
        <template #label>
          {{ $t('view_transaction_history.filters.label_card') }}
        </template>
        <Select />
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
        [time period]
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
