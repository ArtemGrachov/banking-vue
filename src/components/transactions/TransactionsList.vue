<script setup lang="ts">
import TransactionsItem from '@/components/transactions/TransactionsItem.vue';
import type { ITransaction } from '@/types/models/transaction';

interface IProps {
  transations?: ITransaction[] | null;
}

const { transations = [] } = defineProps<IProps>();
</script>

<template>
  <div class="transations-list">
    <ul class="list">
      <li
        v-for="transation in transations"
        :key="transation.id"
        class="item"
      >
        <TransactionsItem :transaction="transation" />
      </li>
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
