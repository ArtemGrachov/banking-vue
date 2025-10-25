<script setup lang="ts">
import { onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

import { EStatus } from '@/constants/status';

import { useTransactionsStore } from './store/transactions';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';
import NoTransactions from '@/components/transactions/NoTransactions.vue';
import TransactionsList from '@/components/transactions/TransactionsList.vue';

const toast = useToast();
const transactionsStore = useTransactionsStore();
const getErrorMessage = useGetErrorMessage();

const getTransactionsData = async () => {
  if (transactionsStore.isProcessing) {
    return;
  }

  try {
    await transactionsStore.getTransactions();
  } catch (err) {
    console.error(err);
    toast.error(getErrorMessage(err));
  }
}

const getPageData = () => {
  transactionsStore.clear();
  getTransactionsData();
}

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <TransactionsList
      :mobile-full-page="true"
      :transactions="transactionsStore.data"
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
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
}

</style>
