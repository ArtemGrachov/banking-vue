<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useOrderCard } from './composables/order-card';
import { useToast } from '@/composables/toast/toast';

import BankCard from '@/components/bank-cards/BankCard.vue';
import FormOrderCard from '@/components/forms/FormOrderCard.vue';

import type { ICard } from '@/types/models/card';
import { ECardDesign } from '@/constants/cards';

import type { IFormOrderCard } from '@/types/forms/form-order-card';

const { submit, submitStatus, statusMessage } = useOrderCard();
const toast = useToast();
const { t } = useI18n();

const submitHandler = async (formValue: IFormOrderCard) => {
  console.log(formValue);

  try {
    await submit(formValue);
    toast.success(statusMessage.value!);
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'));
  }
}

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
    <div class="container">
      <BankCard
        :card="mockCard"
        class="card-preview"
      />
      <FormOrderCard
        :submit-status="submitStatus"
        :status-message="statusMessage"
        @submit="submitHandler"
        @design-select="designSelectHandler"
      />
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  @include layout.page-default();
}

.container {
  @include layout.container();

  @include breakpoints.sm() {
    @include layout.container(400px);
  }
}

.card-preview {
  margin: 0 auto 24px;
}
</style>