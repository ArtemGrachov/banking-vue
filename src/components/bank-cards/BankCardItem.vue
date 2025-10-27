<script setup lang="ts">
import Button from '@/components/buttons/Button.vue';
import type { ICard } from '@/types/models/card';

interface IProps {
  card?: ICard;
}

defineProps<IProps>();

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
      <Button v-if="card" type="button" variant="primary">
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
      width: 400px;
    }
  }

  &._details {
    flex: 0 1 auto;
    min-width: 300px;
  }
}

.balance {
  margin-bottom: 16px;
}

.label {
  font-weight: 600;
}
</style>
