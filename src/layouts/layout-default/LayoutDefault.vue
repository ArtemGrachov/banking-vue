<script setup lang="ts">
import NavMenu from '@/components/nav/NavMenu.vue';

</script>

<template>
  <div class="row">
    <aside class="sidebar">
      <NavMenu />
    </aside>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.row {
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
}

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
