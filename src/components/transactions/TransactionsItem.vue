<script lang="ts" setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

import { ETransationsType } from '@/constants/transactions';
import { DATE_TIME_DEFAULT_FORMAT } from '@/constants/date-time';

import type { ITransaction } from '@/types/models/transaction';
import TransactionCategoryIcon from '@/components/transactions/TransactionCategoryIcon.vue';

interface IProps {
  transaction: ITransaction;
}

const { transaction } = defineProps<IProps>();

const isIncome = computed(() => {
  return transaction.type === ETransationsType.INCOME;
});

const dateTimeFormatted = computed(() => {
  return dayjs(transaction.dateTime).format(DATE_TIME_DEFAULT_FORMAT);
})
</script>

<template>
  <article class="transaction" :class="{ _income: isIncome }">
    <TransactionCategoryIcon
      class="icon category-icon"
      :category="transaction.category"
    />
    <span class="icon transaction-icon material-symbols-outlined">
      keyboard_tab
    </span>
    <div class="details">
      <div class="datetime">
        {{ dateTimeFormatted }}
      </div>
      <div class="participant">
        {{ isIncome ? transaction.sender : transaction.recipient }}
      </div>
    </div>
    <div class="amount">
      <!-- @TODO number and currency format -->
      {{ transaction.amount }} {{  transaction.currency }}
    </div>
  </article>
</template>

<style lang="scss" scoped>
.transaction {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: background 200ms;
  padding: 16px;
  border-radius: 4px;

  &:hover {
    background: #fcefef;
  }

  &._income {
    .transaction-icon {
      transform: rotate(90deg);
      color: green;
      background: #d4f0d4;
    }

    .amount {
      color: green;
    }

    &:hover {
      background: #ebfbeb;
    }
  }
}

.icon {
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-icon {
  color: red;
  background: #efd7d7;
  transform: rotate(-90deg);
}

.category-icon {
  color: var(--icon-category-color, #484848);
  background: var(--icon-category-background, #dcdcdc);
}

.details {
  flex: 1 1 auto;
}

.datetime {
  font-size: 14px;
  color: #484848;
}

.participant {
  font-size: 18px;
  font-weight: 500;
}

.amount {
  flex: 0 0 auto;
  font-weight: 600;
  color: red;
}
</style>
