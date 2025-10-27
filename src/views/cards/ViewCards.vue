<script setup lang="ts">
import { onMounted } from 'vue';

import { useCardsStore } from '../../store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';

import BankCardList from '@/components/bank-cards/BankCardList.vue';

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
    <BankCardList
      class="bank-card-list"
      :cards="cardsStore.data"
      :is-processing="cardsStore.isProcessing"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  display: flex;
}

.bank-card-list {
  flex: 0 0 auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
