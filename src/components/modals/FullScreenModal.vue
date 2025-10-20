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
    <div class="fullscreen-modal">
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
.fullscreen-modal {
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: white;
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
}

.close {
  height: var(--header-height);
  width:  var(--header-height);
}

.content {
  --content-padding: 16px;

  flex: 1 1 auto;
  overflow-y: auto;
  padding: var(--content-padding);
}
</style>
