<script setup lang="ts">
import BankCard from '@/components/bank-cards/BankCard.vue';

</script>

<template>
  <div class="page">
    <BankCard />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/texts.scss' as texts;

.page {
  @include layout.page();
}
</style>
