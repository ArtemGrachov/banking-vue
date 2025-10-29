<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useCardsStore } from '@/store/cards';

import { useTransfer } from './composable/transfer';
import { useGetCardsData } from '@/composables/data/get-cards-data';
import { useToast } from '@/composables/toast/toast';
import Button from '@/components/buttons/Button.vue';
import { useConfirmationModal } from '@/composables/modals/confirmation-modal';
import FormMoneyTransfer from '@/components/forms/FormMoneyTransfer.vue';
import SuccessPlaceholder from '@/components/error/SuccessPlaceholder.vue';

import type { IFormMoneyTransfer } from '@/types/forms/form-money-transfer';

const { t } = useI18n();
const route = useRoute();
const router = useRouter()
const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();
const { submit, submitStatus, statusMessage } = useTransfer();
const toast = useToast();

const getPageData = () => {
  cardsStore.clear();
  getCardsData();
}

const question = ref('');
const isTransferred = ref(false);
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

  try {
    await submit(formValue);
    isTransferred.value = true;
    toast.success(t('view_registration.success'));
    router.push({ query: { success: 'true'} });
  } catch (err) {
    console.error(err);
    toast.error(t('common_errors.generic'));
  }
}

const returnHandler = () => {
  isTransferred.value = false;
  router.replace({ query: { success: undefined } });
}

onMounted(() => {
  getPageData();

  if (route.query.success) {
    router.replace({ query: { success: undefined } });
  }
});

watch(route, (newRoute) => {
  if (!newRoute.query.success) {
    isTransferred.value = false;
  }
});
</script>

<template>
  <div class="page">
    <SuccessPlaceholder v-if="isTransferred">
      <template #title>
        {{ $t('view_transfer.success_title') }}
      </template>
      <template #subtitle>
        {{ $t('view_transfer.success_subtitle') }}
        <Button type="button" class="return" variant="primary" @click="returnHandler">
          {{ $t('view_transfer.return') }}
        </Button>
      </template>
    </SuccessPlaceholder>
    <FormMoneyTransfer
      v-else
      :cards="cardsStore.data"
      :is-cards-processing="cardsStore.isProcessing"
      :submit-status="submitStatus"
      :status-message="statusMessage"
      @submit="submitHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;

.page {
  @include layout.page();
  @include layout.page-default();

  overflow: hidden;
}

.return {
  margin-top: 24px;
}
</style>
