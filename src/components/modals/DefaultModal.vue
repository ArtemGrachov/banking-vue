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

$margin: 32px;

.default-modal {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
  
  @include breakpoints.sm() {
    margin: $margin auto;
    width: calc(100dvw - #{$margin * 2});
    height: auto;
    max-width: 500px;
    max-height: calc(100dvh - #{$margin * 2});
    box-shadow: 0 18px 30px -8px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }
}

.header {
  --header-height: 74px;

  height: var(--header-height);
  box-shadow: 0 5px 16px 0 rgba(black, 0.1);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  flex: 0 0 auto;

  @include breakpoints.sm() {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
}

.close {
  height: var(--header-height);
  width:  var(--header-height);
  margin-left: auto;
}

.content {
  --content-padding: 16px;

  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--content-padding);
}
</style>
