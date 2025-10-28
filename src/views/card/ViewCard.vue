<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { useCardStore } from './store/card';
import { useCardsStore } from '@/store/cards';

import { useCard } from './composables/card';
import { useBlock } from './composables/block';
import { useClose } from './composables/close';
import { useGetRoute } from '@/composables/routing/get-route';

import Button from '@/components/buttons/Button.vue';
import BankCard from '@/components/bank-cards/BankCard.vue';
import BankCardSkeleton from '@/components/bank-cards/BankCardSkeleton.vue';
import FormStatus from '@/components/forms/FormStatus.vue';
import { ROUTE_NAMES } from '@/router/routes';

const { getPageData } = useCard();
const cardStore = useCardStore();
const cardsStore = useCardsStore();
const card = computed(() => cardStore.card);
const getRoute = useGetRoute();

const {
  blockStatus,
  statusMessage: blockStatusMessage,
  isProcessing: blockIsProcessing,
  block,
} = useBlock();

const {
  closeStatus,
  statusMessage: closeStatusMessage,
  isProcessing: closeIsProcessing,
  close,
} = useClose();

const transactionsLink = computed(() => {
  const id = card.value?.id;

  const link = getRoute({
    name: ROUTE_NAMES.TRANSACTION_HISTORY,
    query: {
      cards: id ? [id] : undefined,
    },
  });

  return link;
});

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card-row">
        <BankCardSkeleton v-if="cardsStore.isProcessing" />
        <BankCard v-else-if="card" :card="card" />
      </div>
      <div class="balance">
        <span class="label">
          {{ $t('view_card.balance') }}: 
        </span>
        <template v-if="cardsStore.isProcessing">
          ...
        </template>
        <template v-else-if="card">
          {{ card.balance }} {{ card.currency }}
        </template>
      </div>
      <div class="actions">
        <Button
          variant="primary"
          class="action"
          :as="RouterLink"
          :to="transactionsLink"
        >
          <span class="material-symbols-outlined">
            list
          </span>
          {{ $t('view_card.transactions') }}
        </Button>
        <Button
          type="button"
          variant="transparent"
          class="action"
          :is-processing="blockIsProcessing"
          :disabled="card?.isClosed"
          @click="block"
        >
          <span class="material-symbols-outlined">
            block
          </span>
          {{ card?.isBlocked ? $t('common_cards.block.label_unblock') : $t('common_cards.block.label_block') }}
        </Button>
        <Button
          type="button"
          variant="transparent"
          class="action"
          :is-processing="closeIsProcessing"
          :disabled="card?.isClosed"
          @click="close"
        >
          <span class="material-symbols-outlined">
            close
          </span>
          {{ $t('common_cards.close.label') }}
        </Button>
      </div>
      <div v-if="blockStatusMessage || closeStatusMessage" class="statuses">
        <FormStatus
          v-if="blockStatusMessage"
          class="status"
          :status="blockStatus"
        >
          {{ blockStatusMessage }}
        </FormStatus>
        <FormStatus
          v-if="closeStatusMessage"
          class="status"
          :status="closeStatus"
        >
          {{ closeStatusMessage }}
        </FormStatus>
      </div>
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
  @include layout.container(auto);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-row {
  margin-bottom: 24px;
}

.balance {
  text-align: center;
  margin-bottom: 24px;
}

.label {
  font-weight: 600;
}

.actions {
  @include breakpoints.sm() {
    display: flex;
    gap: 16px;
  }
}

.action {
  margin-bottom: 16px;

  @include breakpoints.sm() {
    margin-bottom: 0;
  }
}

.statuses {
  max-width: 400px;
}

.status {
  margin-top: 24px;
}
</style>
