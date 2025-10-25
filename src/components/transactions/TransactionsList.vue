<script setup lang="ts">
import TransactionsItem from '@/components/transactions/TransactionsItem.vue';
import TransactionsItemSkeleton from '@/components/transactions/TransactionsItemSkeleton.vue';

import type { ITransaction } from '@/types/models/transaction';

interface IProps {
  mobileFullPage?: boolean;
  transactions?: ITransaction[] | null;
  isProcessing?: boolean;
}

const { transactions = [], isProcessing } = defineProps<IProps>();
</script>

<template>
  <div class="transactions-list">
    <ul class="list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="item"
      >
        <TransactionsItem :transaction="transaction" />
      </li>
      <template v-if="isProcessing">
        <li class="item" v-for="i in 5" :key="i">
          <TransactionsItemSkeleton />
        </li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  margin-bottom: 4px;
}
</style>
