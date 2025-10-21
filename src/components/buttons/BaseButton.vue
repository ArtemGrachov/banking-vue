<script setup lang="ts">
export interface IProps {
  as?: 'button' | 'a';
}

const { as = 'button' } = defineProps<IProps>();
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>
