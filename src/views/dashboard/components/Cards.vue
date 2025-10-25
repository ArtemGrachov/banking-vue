<script lang="ts" setup>
import { useCardsStore } from '../store/cards';

import { EStatus } from '@/constants/status';

import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';
import OrderCard from '@/components/bank-cards/OrderCard.vue';

const cardsStore = useCardsStore();
</script>

<template>
  <BankCardCarousel
    :mobileFullPage="true"
    :cards="cardsStore.data"
    :is-processing="cardsStore.getStatus === EStatus.PROCESSING"
  >
    <OrderCard />
  </BankCardCarousel>
</template>
