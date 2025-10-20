<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

import IconButton from '@/components/buttons/IconButton.vue';

export type Emits = {
  (e: 'close'): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <VueFinalModal>
    <div class="default-modal">
      <div class="header">
        <slot name="header" />
        <IconButton class="close" @click="emit('close')">
          <span class="material-symbols-outlined">
            close
          </span>
        </IconButton>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </VueFinalModal>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/modals.scss' as modals;

.default-modal {
  @include modals.base();
  @include modals.fullscreen();

  @include breakpoints.sm() {
    @include modals.default();
  }
}

.header {
  @include modals.header();

  @include breakpoints.sm() {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.close {
  @include modals.close();
}

.content {
  @include modals.content();
}
</style>
