<script lang="ts" setup>
import { useCardsStore } from '../../../store/cards';

import { EStatus } from '@/constants/status';

import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';
import OrderCard from '@/components/bank-cards/OrderCard.vue';
import NoCards from '@/components/bank-cards/NoCards.vue';
import ErrorPlaceholder from '@/components/error/ErrorPlaceholder.vue';

const cardsStore = useCardsStore();
</script>

<template>
  <BankCardCarousel
    class="carousel"
    :cards="cardsStore.data"
    :is-processing="cardsStore.getStatus === EStatus.PROCESSING"
  >
    <OrderCard v-if="!cardsStore.isProcessing" />
    <template v-if="cardsStore.isEmpty" #placeholder>
      <NoCards />
    </template>
    <template v-if="cardsStore.isError" #placeholder>
      <ErrorPlaceholder class="placeholder">
        {{ cardsStore.statusMessage }}
        <br>
        {{ $t('common_errors.refresh') }}
      </ErrorPlaceholder>
    </template>
  </BankCardCarousel>
</template>

<style lang="scss" scoped>
.carousel {
  --bank-card-carousel-padding: 0 16px;
  overflow: hidden;
}

.placeholder {
  height: 100%;
}
</style>
