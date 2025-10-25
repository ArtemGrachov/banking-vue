<script lang="ts" setup>
import { useCardsStore } from '../store/cards';

import { EStatus } from '@/constants/status';

import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';
import OrderCard from '@/components/bank-cards/OrderCard.vue';
import NoCards from '@/components/bank-cards/NoCards.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';

const cardsStore = useCardsStore();
</script>

<template>
  <BankCardCarousel
    :mobileFullPage="true"
    :cards="cardsStore.data"
    :is-processing="cardsStore.getStatus === EStatus.PROCESSING"
  >
    <OrderCard />
    <template v-if="cardsStore.isEmpty" #placeholder>
      <NoCards />
    </template>
    <template v-if="cardsStore.isError" #placeholder>
      <ErrorPlaceholder>
        {{ cardsStore.statusMessage }}
        <br>
        {{ $t('common_errors.refresh') }}
      </ErrorPlaceholder>
    </template>
  </BankCardCarousel>
</template>
