<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';
import { EStatus } from '@/constants/status';

import { useToast } from '@/composables/toast/toast';
import { useTransactionsData } from '@/composables/transations/transactions-data';
import { useGetErrorMessage } from '@/composables/common/get-error-message';
import { useGetRoute } from '@/composables/routing/get-route';

import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';
import TransactionsList from '@/components/transactions/TransactionsList.vue';
import Button from '@/components/buttons/Button.vue';

const toast = useToast();
const { data: transactions, getStatus: getTransactionsStatus, getTransactions } = useTransactionsData();
const getErrorMessage = useGetErrorMessage();
const getRoute = useGetRoute();

const getTransactionsData = async () => {
  try {
    await getTransactions({ itemsPerPage: 5 });
  } catch (err) {
    toast.error(getErrorMessage(err));
  }
}

onMounted(() => {
  getTransactionsData();
});
</script>

<template>
  <div class="page">
    <div class="cards">
      <BankCardCarousel :mobileFullPage="true" />
    </div>
    <div class="transactions">
      <h2>
        {{ $t('view_dashboard.transations_title') }}
      </h2>
      <TransactionsList
        :transations="transactions"
        :is-processing="getTransactionsStatus === EStatus.PROCESSING"
      />
      <Button :as="RouterLink" variant="primary" :to="getRoute({ name: ROUTE_NAMES.TRANSACTION_HISTORY })">
        {{ $t('view_dashboard.transactions_view_all') }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;

.page {
  @include layout.page();
}

.cards {
  margin-bottom: 48px;
}
</style>
