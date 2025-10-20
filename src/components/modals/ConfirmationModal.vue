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
  <VueFinalModal :click-to-close="false">
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

$margin: 32px;

.confirmation-modal {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
  margin: $margin auto;
  width: calc(100dvw - #{$margin * 2});
  max-width: 300px;
  max-height: calc(100dvh - #{$margin * 2});
  box-shadow: 0 18px 30px -8px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  position: relative;
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
