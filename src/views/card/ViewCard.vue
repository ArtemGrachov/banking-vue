<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useCardStore } from './store/card';
import { useCardsStore } from '@/store/cards';

import { useCard } from './composables/card';
import { useBlock } from './composables/block';
import { useClose } from './composables/close';

import Button from '@/components/buttons/Button.vue';
import BankCard from '@/components/bank-cards/BankCard.vue';
import BankCardSkeleton from '@/components/bank-cards/BankCardSkeleton.vue';
import FormStatus from '@/components/forms/FormStatus.vue';

const { getPageData } = useCard();
const cardStore = useCardStore();
const cardsStore = useCardsStore();
const card = computed(() => cardStore.card);

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

onMounted(() => {
  getPageData();
});
</script>

<template>
  <div class="page">
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
        type="button"
        variant="primary"
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
        variant="primary"
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
</template>


<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.page {
  @include layout.page();
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-row {
  width: 100%;
  max-width: 340px;
  margin-bottom: 24px;

  @include breakpoints.sm() {
    max-width: 400px;
  }
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
