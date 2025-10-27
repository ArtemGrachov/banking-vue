<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCardsStore } from '@/store/cards';

import { useGetCardsData } from '@/composables/data/get-cards-data';

import Button from '@/components/buttons/Button.vue';
import BankCard from '@/components/bank-cards/BankCard.vue';
import BankCardSkeleton from '@/components/bank-cards/BankCardSkeleton.vue';

const route = useRoute();

const cardsStore = useCardsStore();
const { getCardsData } = useGetCardsData();

const getPageData = () => {
  cardsStore.clear();
  getCardsData();
}

const card = computed(() => {
  const rawId = route.params.id!;

  return cardsStore.data?.find(c => c.id === +rawId);
});

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
      1000 USD
    </div>
    <div class="actions">
      <Button
        type="button"
        variant="primary"
        class="action"
      >
        <span class="material-symbols-outlined">
          block
        </span>
        {{ $t('view_card.block') }}
      </Button>
      <Button
        type="button"
        variant="primary"
        class="action"
      >
        <span class="material-symbols-outlined">
          close
        </span>
        {{ $t('view_card.close') }}
      </Button>
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
  max-width: 400px;
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
</style>
