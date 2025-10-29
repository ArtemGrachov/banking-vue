<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import Button from '@/components/buttons/Button.vue';

import type { ICard } from '@/types/models/card';

interface IProps {
  card?: ICard;
}

defineProps<IProps>();
const getRoute = useGetRoute();

</script>

<template>
  <div class="bank-card-item">
    <div class="col _card">
      <slot />
    </div>
    <div class="col _details">
      <div class="balance">
        <template v-if="card">
          <span class="label">
            {{ $t('bank_card_item.balance') }}:
          </span>
          {{ card.balance }} {{ card.currency }}
        </template>
      </div>
      <Button
        v-if="card"
        :to="getRoute({ name: ROUTE_NAMES.CARD, params: { id: card.id } })"
        :as="RouterLink"
        class="manage"
      >
        <span class="material-symbols-outlined">
          settings
        </span>
        {{ $t('bank_card_item.manage') }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.bank-card-item {
  @include breakpoints.sm() {
    display: flex;
    align-items: stretch;
    gap: 16px;
  }
}

.col {
  &._card {
    flex: 0 0 auto;
    margin-bottom: 16px;

    @include breakpoints.sm() {
      margin-bottom: 0;
    }
  }

  &._details {
    flex: 0 1 auto;
    min-width: 300px;
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;

    @include breakpoints.sm() {
      display: block;
    }
  }
}

.balance {
  @include breakpoints.sm() {
    margin-bottom: 16px;
  }
}

.label {
  font-weight: 600;
}

.manage {
  --button-width: auto;
}
</style>
