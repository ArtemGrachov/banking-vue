<script setup lang="ts">
import { RouterLink } from 'vue-router';

import Button from '@/components/buttons/Button.vue';
import { useGetRoute } from '@/composables/routing/get-route';
import { ROUTE_NAMES } from '@/router/routes';

const getRoute = useGetRoute();

</script>

<template>
  <nav class="nav-links">
    <ul class="list">
      <li class="item">
        <Button
          :as="RouterLink"
          :to="getRoute({ name: ROUTE_NAMES.CHARTS })"
          variant="transparent"
          class="link"
        >
          <span class="material-symbols-outlined">
            clock_loader_10
          </span>
          {{ $t('view_dashboard.nav_links.link_charts') }}
        </Button>
      </li>
      <li class="item">
        <Button
          :as="RouterLink"
          :to="getRoute({ name: ROUTE_NAMES.CARDS })"
          variant="transparent"
          class="link"
        >
          <span class="material-symbols-outlined">
            credit_card
          </span>
          {{ $t('view_dashboard.nav_links.link_cards') }}
        </Button>
      </li>
      <li class="item">
        <Button
          :as="RouterLink"
          :to="getRoute({ name: ROUTE_NAMES.ORDER_CARD })"
          variant="transparent"
          class="link"
        >
          <span class="material-symbols-outlined">
            add_card
          </span>
          {{ $t('view_dashboard.nav_links.link_order_card') }}
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>

.nav-links {
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 16px;
}

.link {
  white-space: nowrap;
}
</style>
