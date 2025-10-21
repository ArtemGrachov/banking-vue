<template>
  <aside class="sidebar">
    @todo user navigation menu
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
  }
}
</style>
