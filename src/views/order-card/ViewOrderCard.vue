<script setup lang="ts">
import { computed, ref } from 'vue';

import BankCard from '@/components/bank-cards/BankCard.vue';
import FormOrderCard from '@/components/forms/FormOrderCard.vue';

import type { ICard } from '@/types/models/card';
import { ECardDesign } from '@/constants/cards';

const basicMockCard: ICard = {
  id: -1,
  cardNumber: '0000 0000 0000 0000',
  verification: '000',
  expireDate: '00/00',
  currency: 'AAA',
  cardholderName: 'Name Surname',
  balance: 10000,
};

const design = ref(ECardDesign.RED);

const mockCard = computed(() => {
  return {
    ...basicMockCard,
    design: design.value,
  };
});

const designSelectHandler = (value: ECardDesign) => {
  design.value = value;
}
</script>

<template>
  <div class="page">
    <div class="card-preview">
      <BankCard :card="mockCard" />
    </div>
    <FormOrderCard
      @design-select="designSelectHandler"
    />
  </div>
</template>


<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  max-width: 400px;
  margin: 0 auto;
}

.card-preview {
  margin-bottom: 24px;
}
</style>