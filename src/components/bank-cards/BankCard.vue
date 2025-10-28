<script lang="ts" setup>
import { computed } from 'vue';

import type { ICard } from '@/types/models/card';

interface IProps {
  card: ICard;
}

const { card } = defineProps<IProps>();

const numberParts = computed(() => card.cardNumber.split(' '));
</script>

<template>
  <div class="bank-card" :class="`_${card.design}`">
    <div class="top">
      <div class="bank-name">
        Bank name
      </div>
    </div>
    <div class="bottom">
      <div class="number">
        <span v-for="part in numberParts" :key="part">
          {{ part }}
        </span>
      </div>
      <div class="expire">
        <div class="expire-label">
          Month/Year
        </div>
        <div class="row">
          <span class="cell">
            EXP
          </span>
          <span class="cell">
            {{ card.expireDate }}
          </span>
        </div>
      </div>
      <div class="cardholder">
        {{ card.cardholderName }}
      </div>
    </div>
    <span v-if="card.isBlocked" class="blocked-icon material-symbols-outlined">
      lock
    </span>
    <span v-if="card.isClosed" class="closed-icon material-symbols-outlined">
      close
    </span>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/functions/px-to-em.scss' as *;
@use '/src/styles/mixins/bank-card.scss' as bank-card;

.bank-card {
  @include bank-card.container();

  font-size: var(--bank-card-font-size, 16px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: px-to-em(12px);
  padding: px-to-em(16px);
  background: linear-gradient(163deg, darkred 27%, black 100%);
  color: white;
  position: relative;

  &._green {
    background: linear-gradient(30deg, darkgreen 10%, rgb(73, 190, 139) 100%);
  }

  &._blue {
    background: linear-gradient(163deg, darkblue 27%, rgb(108, 48, 211) 50%, blue 100%);
  }

  &._golden {
    background: linear-gradient(163deg, gold 27%, white 50%, yellow 52%, orange 85%, yellow 100%);
    color: black;
  }

  &._silver {
    background: linear-gradient(163deg, silver 27%, white 80%, darkgrey 81%, grey 100%);
    color: black;
  }
}

.blocked-icon,
.closed-icon {
  color: red;
  text-shadow: 1px 1px 1px 1px black;
  position: absolute;
  top: px-to-em(8px);
  left: px-to-em(8px);
  width: px-to-em(32px);
  height: px-to-em(32px);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.top, .bottom {
  display: flex;
  flex-direction: column;
  gap: px-to-em(16px);
}

.top {
  margin-bottom: px-to-em(24px);
}

.bank-name {
  align-self: flex-end;
  text-transform: uppercase;
  font-weight: 500;
  font-size: px-to-em(12px);
}

.number {
  font-size: px-to-em(16px);
  display: flex;
  gap: px-to-em(8px);
}

.expire {
  margin: 0 auto;
}

.expire-label {
  text-transform: uppercase;
  font-size: px-to-em(10px);
}

.cardholder {
  font-size: px-to-em(12px);
  text-transform: uppercase;
}
</style>
