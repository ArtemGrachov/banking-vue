<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';
import { useGetRoute } from '@/composables/routing/get-route';

const getRoute = useGetRoute();

</script>

<template>
  <footer class="footer">
    <div class="cell">
      <RouterLink :to="getRoute({ name: ROUTE_NAMES.ABOUT })">
        {{ $t('footer.about_link') }}
      </RouterLink>
    </div>
    <div class="cell">
      Designed and developed by <a href="https://github.com/ArtemGrachov" target="_blank">Artem Hrachov</a>, 2025
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.footer {
  background: #141414;
  color: white;
  padding: 24px;
  text-align: center;
  font-size: 14px;

  --link-color: red;

  @include breakpoints.sm() {
    display: flex;
    justify-content: space-between;
  }
}

.container {
  @include layout.container();
}
</style>
