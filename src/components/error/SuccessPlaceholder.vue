<script setup lang="ts">
import Placeholder from '@/components/other/Placeholder.vue';

</script>

<template>
  <Placeholder class="success-placeholder">
    <template #icon>
      <span class="material-symbols-outlined">
        check_circle
      </span>
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
  </Placeholder>
</template>

<style lang="scss" scoped>
.success-placeholder {
  --placeholder-icon-background: green;
  --placeholder-icon-color: white;
}
</style>
