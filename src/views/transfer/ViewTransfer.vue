<script setup lang="ts">
import { onMounted } from 'vue';

import { useCardsStore } from '@/store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';
import FormMoneyTransfer from '@/components/forms/FormMoneyTransfer.vue';

import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();

const getPageData = () => {
  cardsStore.clear();
  getCardsData();
}

const submitHandler = async (formValue: IFormMoneyTransfer) => {
  console.log(formValue);
}

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <FormMoneyTransfer
      :cards="cardsStore.data"
      :is-cards-processing="cardsStore.isProcessing"
      @submit="submitHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
}
</style>
