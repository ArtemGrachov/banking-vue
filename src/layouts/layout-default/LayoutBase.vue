<script setup lang="ts">
import Footer from '@/layouts/layout-default/components/Footer.vue';
import Header from '@/layouts/layout-default/components/Header.vue';

</script>

<template>
  <div class="layout">
    <Header class="header" />
    <router-view></router-view>
    <Footer class="footer" />
  </div>
</template>

<style lang="scss" scoped>
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


.footer {
  flex: 0 0 auto;
  margin-top: auto;
}
</style>
