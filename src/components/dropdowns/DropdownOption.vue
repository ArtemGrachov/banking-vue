<script setup lang="ts">
import BaseButton, { type IProps as IBaseButtonProps } from '@/components/buttons/BaseButton.vue';

interface IProps extends IBaseButtonProps {}

const { as = 'button' } = defineProps<IProps>();
</script>

<template>
  <BaseButton :as="as" class="option">
    <slot />
  </BaseButton>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.option {
  @include dropdowns.option();

  text-transform: uppercase;
}
</style>
