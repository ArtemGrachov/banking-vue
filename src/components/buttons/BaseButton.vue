<script setup lang="ts">
import type { Component } from 'vue';

export interface IProps {
  as?: 'button' | 'a' | Component;
}

const { as = 'button' } = defineProps<IProps>();
</script>

<template>
  <component :is="as">
    <slot />
  </component>
</template>
