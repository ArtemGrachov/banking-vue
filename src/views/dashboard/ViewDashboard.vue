<script setup lang="ts">
import { onMounted } from 'vue';

import { useTransactionsStore } from './store/transactions';

import { useToast } from '@/composables/toast/toast';
import { useGetErrorMessage } from '@/composables/common/get-error-message';

import NavLinks from './components/NavLinks.vue';
import Cards from './components/Cards.vue';
import Transactions from './components/Transactions.vue';

const transactionsStore = useTransactionsStore();

const toast = useToast();
const getErrorMessage = useGetErrorMessage();

const getTransactionsData = async () => {
  try {
    await transactionsStore.getTransactions({ itemsPerPage: 5 });
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
    <div class="nav-links">
      <NavLinks />
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

.nav-links {
  margin-left: -(layout.$layout-container-padding);
  margin-right: -(layout.$layout-container-padding);
  padding-left: layout.$layout-container-padding;
  padding-right: layout.$layout-container-padding;
  margin-bottom: 32px;

  @include breakpoints.lg() {
    display: none;
  }
}

.cards {
  margin-bottom: 48px;
}
</style>
