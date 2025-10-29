<script lang="ts" setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

import { ETransactionsType } from '@/constants/transactions';
import { DATE_TIME_DEFAULT_FORMAT } from '@/constants/date-time';

import { useMoneyFormat } from '@/composables/money/money-format';
import TransactionCategoryIcon from '@/components/transactions/TransactionCategoryIcon.vue';

import type { ITransaction } from '@/types/models/transaction';

interface IProps {
  transaction: ITransaction;
}

const { transaction } = defineProps<IProps>();
const mf = useMoneyFormat();

const isIncome = computed(() => {
  return transaction.type === ETransactionsType.INCOME;
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
      {{ mf(transaction.amount, transaction.currency) }}
    </div>
  </article>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/themes.scss' as themes;

.transaction {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  transition: background 200ms;
  padding: 16px;
  line-height: 1.3;

  &:hover {
    background: var(--transaction-hover);
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
      background: var(--transaction-income-hover);
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
  color: var(--secondary-text);
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

@include themes.component-theme-dark() {
  .transaction {
    --transaction-hover: #2d2222;
    --transaction-income-hover: #263b26;
  }
}

@include themes.component-theme-light() {
  .transaction {
    --transaction-hover: #fcefef;
    --transaction-income-hover: #ebfbeb;
  }
}
</style>
