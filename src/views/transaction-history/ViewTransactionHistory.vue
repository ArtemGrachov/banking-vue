<script setup lang="ts">
import { onMounted } from 'vue';

import { EStatus } from '@/constants/status';

import { useTransactionsStore } from './store/transactions';
import { useData } from './composable/data';
import { useCardsStore } from '@/store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';

import Filters from './components/Filters.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';
import NoTransactions from '@/components/transactions/NoTransactions.vue';
import TransactionsList from '@/components/transactions/TransactionsList.vue';
import InfiniteScroll from '@/components/other/InfiniteScroll.vue';

const transactionsStore = useTransactionsStore();
const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();
const { init, nextPage } = useData();

const getPageData = () => {
  transactionsStore.clear();
  cardsStore.clear();
  init();
  getCardsData();
}

const infiniteScrollHandler = () => {
  if (transactionsStore.isInit || transactionsStore.isError) {
    return;
  }

  nextPage();
}

onMounted(() => {
  getPageData();
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
