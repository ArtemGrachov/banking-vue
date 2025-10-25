<script lang="ts" setup>
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';
import { EStatus } from '@/constants/status';

import { useTransactionsStore } from '../store/transactions';

import { useGetRoute } from '@/composables/routing/get-route';
import TransactionsList from '@/components/transactions/TransactionsList.vue';
import Button from '@/components/buttons/Button.vue';

const getRoute = useGetRoute();
const transactionsStore = useTransactionsStore();

</script>

<template>
  <h2>
    {{ $t('view_dashboard.transations_title') }}
  </h2>
  <TransactionsList
    :transations="transactionsStore.data"
    :is-processing="transactionsStore.getStatus === EStatus.PROCESSING"
  />
  <Button :as="RouterLink" variant="primary" :to="getRoute({ name: ROUTE_NAMES.TRANSACTION_HISTORY })">
    {{ $t('view_dashboard.transactions_view_all') }}
  </Button>
</template>
