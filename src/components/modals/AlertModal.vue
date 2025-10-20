<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

import Button from '@/components/buttons/Button.vue';

export type Emits = {
  (e: 'close'): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <VueFinalModal :click-to-close="false">
    <div class="alert-modal">
      <div class="content">
        <slot />
      </div>
      <div class="footer">
        <Button type="button" @click="emit('close')">
          <slot name="accept" />
          <template v-if="!$slots.accept">
            Ok
            <!-- @TODO Translation -->
          </template>
        </Button>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/modals.scss' as modals;

$margin: 32px;

.alert-modal {
  @include modals.base();
  @include modals.small();
}

.content {
  overflow-y: auto;
  padding: 16px 16px 0;
}

.footer {
  padding: 16px;
}
</style>
