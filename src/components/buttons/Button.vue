<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue';
import BaseButton, { type IProps as IBaseButtonProps } from '@/components/buttons/BaseButton.vue';

const IconLoader = defineAsyncComponent(() => import('@/components/loaders/IconLoader.vue'));

export type ButtonVariants = 'default' | 'primary' | 'transparent';

interface IProps extends IBaseButtonProps {
  variant?: ButtonVariants;
  isProcessing?: boolean;
}

const { variant, as = 'button', isProcessing } = defineProps<IProps>();

const hostClassNames = computed(() => {
  const result: string[] = [];

  switch (variant) {
    case 'primary': {
      result.push('_primary');
      break;
    }
    case 'transparent': {
      result.push('_transparent');
      break;
    }
  }

  if (isProcessing) {
    result.push('_processing');
  }

  return result;
});
</script>

<template>
  <BaseButton :as="as" class="button" :class="hostClassNames">
    <slot />
    <span v-if="isProcessing" class="loader">
      <IconLoader class="loader-icon" />
    </span>
  </BaseButton>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/buttons.scss' as buttons;

.button {
  @include buttons.button();

  &._primary {
    @include buttons.button-primary();

    &._active,
    &.router-link-exact-active {
      @include buttons.button-transparent-active();
    }
  }

  &._transparent {
    @include buttons.button-transparent();

    &._active,
    &.router-link-exact-active {
      @include buttons.button-transparent-active();
    }
  }
}

.loader {
  position: absolute;
  top: 0;
  right: 0;
}

.loader-icon {
  font-size: 20px;
}
</style>
