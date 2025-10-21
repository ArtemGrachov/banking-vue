<script setup lang="ts">
import NavMenu from '@/components/nav/NavMenu.vue';

</script>

<template>
  <aside class="sidebar">
    <NavMenu />
  </aside>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.sidebar {
  display: none;

  @include breakpoints.lg() {
    display: block;
    width: 320px;
    flex: 0 0 auto;
    padding: 32px 0;
  }
}
</style>
