<script setup lang="ts">
import Placeholder from '@/components/other/Placeholder.vue';

</script>

<template>
  <Placeholder class="error-placeholder">
    <template #icon>
      <span class="material-symbols-outlined">
        warning
      </span>
    </template>
    <template #title>
      {{$t('common_errors.generic')}}
    </template>
    <template #subtitle>
      <slot />
    </template>
  </Placeholder>
</template>

<style lang="scss" scoped>
.error-placeholder {
  --placeholder-icon-background: red;
  --placeholder-icon-color: white;
}
</style>
