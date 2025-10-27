<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCardsStore } from '@/store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';
import FormMoneyTransfer from '@/components/forms/FormMoneyTransfer.vue';
import { useConfirmationModal } from '@/composables/modals/confirmation-modal';

import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

const { t } = useI18n();
const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();

const getPageData = () => {
  cardsStore.clear();
  getCardsData();
}

const question = ref('');
const confirmation = useConfirmationModal(question);

const submitHandler = async (formValue: IFormMoneyTransfer) => {
  const selectedCard = cardsStore.data?.find(c => c.id === formValue.card);

  question.value = t(
    'view_transfer.confirmation',
    {
      value: `${formValue.amount} ${selectedCard?.currency}`,
      recipient: formValue.recipient,
    },
  );

  const confirm = await confirmation();

  if (!confirm) {
    return;
  }

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
