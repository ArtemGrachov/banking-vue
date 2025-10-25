<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useTransactionsStore } from './store/transactions';
import { useCardsStore } from './store/cards';

import { useToast } from '@/composables/toast/toast';
import { useGetErrorMessage } from '@/composables/common/get-error-message';

import NavLinks from './components/NavLinks.vue';
import Cards from './components/Cards.vue';
import Transactions from './components/Transactions.vue';
import IconButton from '@/components/buttons/IconButton.vue';

const transactionsStore = useTransactionsStore();
const cardsStore = useCardsStore();

const toast = useToast();
const getErrorMessage = useGetErrorMessage();

const pageProcessing = computed(() => {
  return transactionsStore.isProcessing || cardsStore.isProcessing;
});

const getTransactionsData = async () => {
  if (transactionsStore.isProcessing) {
    return;
  }

  try {
    await transactionsStore.getTransactions({ itemsPerPage: 5 });
  } catch (err) {
    console.error(err);
    toast.error(getErrorMessage(err));
  }
}

const getCardsData = async () => {
  if (cardsStore.isProcessing) {
    return;
  }

  try {
    await cardsStore.getCards();
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

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <div class="header">
      <div class="refresh">
        <IconButton
          variant="primary"
          :is-processing="pageProcessing"
          @click="getPageData"
        >
          <span class="material-symbols-outlined">
            refresh
          </span>
        </IconButton>
      </div>
      <NavLinks class="nav-links" />
    </div>
    <div class="cards">
      <Cards />
    </div>
    <div class="transactions">
      <Transactions />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
}

.header {
  margin-bottom: 16px;
  display: flex;
  justify-content: flex-end;
  margin-left: -(layout.$layout-container-padding);
  margin-right: -(layout.$layout-container-padding);
  position: relative;

  @include breakpoints.lg() {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
}

.refresh {
  position: absolute;
  right: 0;
  padding-left: layout.$layout-container-padding;
  padding-right: layout.$layout-container-padding;
  top: 0;
  z-index: 1;
  display: flex;

  @include breakpoints.lg() {
    padding-left: 0;
    padding-right: 0;
    position: static;
  }
}

.nav-links {
  padding-left: layout.$layout-container-padding;
  padding-right: layout.$layout-container-padding * 2 + 42px;

  @include breakpoints.lg() {
    display: none;
  }
}

.cards {
  margin-bottom: 48px;
}
</style>
