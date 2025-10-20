<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

import IconButton from '@/components/buttons/IconButton.vue';
import Button from '@/components/buttons/Button.vue';

export type Emits = {
  (e: 'close', confirm: boolean): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <VueFinalModal
    :click-to-close="false"
    content-transition="modal-window"
    overlay-transition="modal-overlay"
  >
    <div class="confirmation-modal">
      <div class="content">
        <slot />
      </div>
      <div class="footer">
        <Button type="button" class="action" @click="emit('close', false)">
          <slot name="reject" />
          <template v-if="!$slots.confirm">
            No
            <!-- @TODO Translation -->
          </template>
        </Button>
        <Button type="button" variant="primary" class="action" @click="emit('close', true)">
          <slot name="confirm" />
          <template v-if="!$slots.confirm">
            Yes
            <!-- @TODO Translation -->
          </template>
        </Button>
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/modals.scss' as modals;

$margin: 32px;

.confirmation-modal {
  @include modals.base();
  @include modals.small();
}

.content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 16px 16px 0;
}

.footer {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.action {
  flex: 1 1 0;
}
</style>
