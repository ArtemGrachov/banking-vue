<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import BaseButton, { type IProps as IBaseButtonProps } from '@/components/buttons/BaseButton.vue';

const IconLoader = defineAsyncComponent(() => import('@/components/loaders/IconLoader.vue'));

export type IconButtonVariants = 'default' | 'primary';

interface IProps extends IBaseButtonProps {
  variant?: IconButtonVariants;
  isProcessing?: boolean;
}

const { as = 'button', isProcessing, variant } = defineProps<IProps>();

const hostClassNames = computed(() => {
  const result: string[] = [];

  if (variant === 'primary') {
    result.push('_primary');
  }

  return result;
});
</script>

<template>
  <BaseButton :as="as" class="icon-button" :class="hostClassNames">
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

  &._primary {
    @include buttons.icon-primary();
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
