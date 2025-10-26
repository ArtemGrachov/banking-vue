<script setup lang="ts">
import { onMounted } from 'vue';

import { EStatus } from '@/constants/status';

import { useTransactionsStore } from './store/transactions';
import { useCardsStore } from '@/store/cards';

import { useGetErrorMessage } from '@/composables/common/get-error-message';
import { useGetCardsData } from '@/composables/data/get-cards-data';
import { useToast } from '@/composables/toast/toast';

import Filters from './components/Filters.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';
import NoTransactions from '@/components/transactions/NoTransactions.vue';
import TransactionsList from '@/components/transactions/TransactionsList.vue';
import InfiniteScroll from '@/components/other/InfiniteScroll.vue';

const toast = useToast();
const transactionsStore = useTransactionsStore();
const cardsStore = useCardsStore();
const getErrorMessage = useGetErrorMessage();
const { getCardsData } = useGetCardsData();

const getTransactionsData = async () => {
  if (transactionsStore.isProcessing) {
    return;
  }

  const totalPages = transactionsStore.data?.pagination.totalPages ?? 1;
  const newPage = (transactionsStore.data?.pagination.currentPage ?? 0) + 1;

  if (newPage > totalPages) {
    return;
  }

  try {
    await transactionsStore.getTransactions({ itemsPerPage: 20, page: newPage, });
  } catch (err) {
    console.error(err);
    toast.error(getErrorMessage(err));
  }
}

const getPageData = () => {
  transactionsStore.clear();
  cardsStore.clear();
  getTransactionsData();
  getCardsData();
}

const infiniteScrollHandler = () => {
  if (transactionsStore.isInit || transactionsStore.isError) {
    return;
  }

  getTransactionsData();
}

onMounted(() => {
  getPageData();
  getCardsData();
});
</script>

<template>
  <div class="page">
    <Filters />
    <TransactionsList
      :mobile-full-page="true"
      :transactions="transactionsStore.list"
      :is-processing="transactionsStore.getStatus === EStatus.PROCESSING"
    />
    <NoTransactions v-if="transactionsStore.isEmpty" />
    <ErrorPlaceholder v-if="transactionsStore.isError">
      <p>
        {{ transactionsStore.statusMessage }}
      </p>
    </ErrorPlaceholder>
    <InfiniteScroll :is-disabled="transactionsStore.isProcessing" @scroll="infiniteScrollHandler" />
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
