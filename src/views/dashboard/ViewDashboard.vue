<script setup lang="ts">
import BankCardCarousel from '@/components/bank-cards/BankCardCarousel.vue';

</script>

<template>
  <div class="page">
    <BankCardCarousel :mobileFullPage="true" />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;

.page {
  @include layout.page();
}
</style>
