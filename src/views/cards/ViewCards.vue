<script setup lang="ts">
import { onMounted } from 'vue';

import { useCardsStore } from '../../store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';

import BankCardList from '@/components/bank-cards/BankCardList.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';

const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();

const getPageData = () => {
  cardsStore.clear();
  getCardsData();
}

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <div class="container">
      <BankCardList
        class="bank-card-list"
        :cards="cardsStore.data"
        :is-processing="cardsStore.isProcessing"
      />
      <ErrorPlaceholder v-if="cardsStore.isError">
        <p>
          {{ cardsStore.statusMessage }}
        </p>
      </ErrorPlaceholder>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  @include layout.page-default();
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container {
  padding-left: 16px;
  padding-right: 16px;

  @include breakpoints.lg() {
    @include layout.container();
  }
}

.bank-card-list {
  flex: 0 0 auto;
}
</style>
