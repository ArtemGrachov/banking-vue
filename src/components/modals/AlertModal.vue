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
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

$margin: 32px;

.alert-modal {
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
  overflow-y: auto;
  padding: 16px 16px 0;
}

.footer {
  padding: 16px;
}
</style>
