<script setup lang="ts">
import BankCard from '@/components/bank-cards/BankCard.vue';
import BankCardItem from '@/components/bank-cards/BankCardItem.vue';
import BankCardSkeleton from '@/components/bank-cards/BankCardSkeleton.vue';

import type { ICard } from '@/types/models/card';

interface IProps {
  cards?: ICard[] | null;
  isProcessing?: boolean;
}

defineProps<IProps>();

</script>

<template>
  <div class="bank-card-list">
    <ul class="list">
      <li
        v-for="card in cards"
        :key="card.id"
        class="item"
      >
        <BankCardItem :card="card">
          <BankCard class="card" :card="card" />
        </BankCardItem>
      </li>
      <template v-if="isProcessing">
        <li v-for="i in 3" :key="i" class="item">
          <BankCardItem>
            <BankCardSkeleton />
          </BankCardItem>
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  margin-bottom: 24px;

  @include breakpoints.sm() {
    margin-bottom: 8px;
  }
}
</style>
