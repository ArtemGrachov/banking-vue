<script setup lang="ts">
import { onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

import { EStatus } from '@/constants/status';

import { useTransactionsStore } from './store/transactions';

import { useGetErrorMessage } from '@/composables/common/get-error-message';

import { vIntersectionObserver, type IntersectionCallback } from '@/directives/intersection-observer';
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

const scrollCallback: IntersectionCallback = (entry) => {
  console.log('SCROLL CALLBACK', entry.isIntersecting);
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
    <div class="intersection-observer" v-intersection-observer="{ callback: scrollCallback }"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  position: relative;
}

.intersection-observer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
