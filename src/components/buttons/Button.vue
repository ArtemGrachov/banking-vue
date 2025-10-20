<script setup lang="ts">
import BaseButton, { type IProps as IBaseButtonProps } from '@/components/buttons/BaseButton.vue';
import { computed, defineAsyncComponent } from 'vue';

const IconLoader = defineAsyncComponent(() => import('@/components/loaders/IconLoader.vue'));

interface IProps extends IBaseButtonProps {
  variant?: 'default' | 'primary';
  as?: 'button' | 'a';
  isProcessing?: boolean;
}

const { variant, as = 'button', isProcessing } = defineProps<IProps>();

const hostClassNames = computed(() => {
  const result: string[] = [];

  if (variant === 'primary') {
    result.push('_primary')
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
  }
}

.loader {
  position: relative;
}

.loader-icon {
  position: absolute;
  top: -0.5em;
  left: -0.25em;
}
</style>
