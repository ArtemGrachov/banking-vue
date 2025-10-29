<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useModal } from 'vue-final-modal';

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

import Button from '@/components/buttons/Button.vue';

const ModalFilters = defineAsyncComponent(() => import('@/views/transaction-history/components/ModalFilters.vue'));

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

const { open: openModalFilters, close: closeModalFilters } = useModal({
  component: ModalFilters,
  attrs: {
    onClose: () => closeModalFilters(),
  },
});

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <div class="container">
      <Button
        class="modal-filters-trigger"
        variant="primary"
        @click="openModalFilters"
      >
        {{ $t('view_transaction_history.mobile_trigger') }}
      </Button>
      <Filters class="desktop-filters" />
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
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  @include layout.page-default();
  position: relative;
}

.container {
  @include layout.container();
}

.modal-filters-trigger {
  margin-bottom: 24px;

  @include breakpoints.sm() {
    display: none;
  }
}

.desktop-filters {
  display: none;

  @include breakpoints.sm() {
    display: flex;
  }
}
</style>
