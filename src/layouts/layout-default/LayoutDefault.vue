<script setup lang="ts">
import Footer from '@/layouts/layout-default/components/Footer.vue';
import Header from '@/layouts/layout-default/components/Header.vue';

</script>

<template>
  <div class="layout">
    <Header class="header" />
    <div class="container">
      <aside class="sidebar">
        @todo user navigation menu
      </aside>
      <router-view></router-view>
    </div>
    <Footer class="footer" />
  </div>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  flex: 0 0 auto;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
}

.container {
  @include layout.container();

  @include breakpoints.lg() {
    display: flex;
    align-items: stretch;
  }
}

.sidebar {
  display: none;

  @include breakpoints.lg() {
    display: block;
    width: 320px;
    flex: 0 0 auto;
  }
}

.footer {
  flex: 0 0 auto;
  margin-top: auto;
}
</style>
