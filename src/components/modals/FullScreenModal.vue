<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

import IconButton from '@/components/buttons/IconButton.vue';

export type Emits = {
  (e: 'close'): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <VueFinalModal
    content-transition="fullscreen-modal"
    :hide-overlay="true"
  >
    <div class="fullscreen-modal">
      <div class="header">
        <IconButton
          v-if="!$slots.close"
          class="close"
          variant="primary"
          @click="emit('close')"
        >
          <span class="material-symbols-outlined">
            close
          </span>
        </IconButton>
        <slot name="close" />
        <slot name="header" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/modals.scss' as modals;

.fullscreen-modal {
  @include modals.base();
  @include modals.fullscreen();
}

.header {
  @include modals.header();
}

.close {
  @include modals.close();
}

.content {
  @include modals.content();
}
</style>
