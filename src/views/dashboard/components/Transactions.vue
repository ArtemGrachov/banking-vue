<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';
import { EStatus } from '@/constants/status';

import { useTransactionsStore } from '../store/transactions';

import { useGetRoute } from '@/composables/routing/get-route';
import TransactionsList from '@/components/transactions/TransactionsList.vue';
import Button from '@/components/buttons/Button.vue';
import NoTransactions from '@/components/transactions/NoTransactions.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';

const getRoute = useGetRoute();
const transactionsStore = useTransactionsStore();
</script>

<template>
  <TransactionsList
    :mobile-full-page="true"
    :transactions="transactionsStore.data?.data"
    :is-processing="transactionsStore.getStatus === EStatus.PROCESSING"
  />
  <NoTransactions v-if="transactionsStore.isEmpty" />
  <ErrorPlaceholder v-if="transactionsStore.isError">
    <p>
      {{ transactionsStore.statusMessage }}
    </p>
    <p>
      {{ $t('common_errors.refresh') }}
    </p>
  </ErrorPlaceholder>
  <div class="button-row">
    <Button
      v-if="transactionsStore.isSuccess && !transactionsStore.isEmpty"
      :as="RouterLink"
      variant="primary"
      :to="getRoute({ name: ROUTE_NAMES.TRANSACTION_HISTORY })"
    >
      {{ $t('view_dashboard.transactions_view_all') }}
    </Button>
  </div>
</template>

<style lang="scss" scoped>
.button-row {
  text-align: right;
  margin-top: 24px;
}
</style>
