<script lang="ts" setup>
import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';
import OrderCard from '@/components/bank-cards/OrderCard.vue';

</script>

<template>
  <BankCardCarousel :mobileFullPage="true">
    <OrderCard />
  </BankCardCarousel>
</template>
