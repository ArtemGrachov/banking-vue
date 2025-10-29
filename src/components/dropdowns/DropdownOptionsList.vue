<script setup lang="ts">
interface IProps {
  slots?: string[];
}

defineProps<IProps>();
</script>

<template>
  <ul class="list">
    <template v-for="slot in slots" :key="slot" >
      <li class="item">
        <slot :name="slot" />
      </li>
    </template>
  </ul>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/dropdowns.scss' as dropdowns;

.list {
  @include dropdowns.option-list();
}
</style>
