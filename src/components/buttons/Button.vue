<script setup lang="ts">
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, computed } from 'vue';

interface IProps {
  variant?: 'default' | 'primary';
  as?: 'button' | 'a';
}

const { variant, as = 'button' } = defineProps<IProps>();

const hostClassNames = computed(() => {
  const result: string[] = [];

  if (variant === 'primary') {
    result.push('_primary')
  }

  return result;
});
</script>

<template>
  <component :is="as" class="button" :class="hostClassNames">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/buttons.scss' as buttons;

.button {
  @include buttons.button();

  &._primary {
    @include buttons.button-primary();
  }
}
</style>
