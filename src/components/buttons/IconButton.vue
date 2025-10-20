<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import { defineAsyncComponent } from 'vue';

const IconLoader = defineAsyncComponent(() => import('@/components/loaders/IconLoader.vue'));

interface IProps {
  as?: 'button' | 'a';
  isProcessing?: boolean;
}

const { as = 'button', isProcessing } = defineProps<IProps>();
</script>

<template>
  <BaseButton :as="as" class="icon-button">
    <slot />
    <span v-if="isProcessing" class="loader">
      <IconLoader class="loader-icon" />
    </span>
  </BaseButton>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/buttons.scss' as buttons;

.icon-button {
  @include buttons.icon();

  position: relative;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
