<script setup lang="ts">
interface IProps {
  isActive?: boolean;
}

defineProps<IProps>();
</script>

<template>
  <span class="material-symbols-outlined arrow" :class="{ _active: isActive }">
    arrow_drop_down
  </span>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.arrow {
  @include dropdowns.arrow();

  &._active {
    @include dropdowns.arrow-active();
  }
}
</style>
