<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import Button from '@/components/buttons/Button.vue';
import { useGetRoute } from '@/composables/routing/get-route';

const { t } = useI18n();
const getRoute = useGetRoute();

const links = [
  {
    key: 'dashboard',
    label: t('nav.dashboard'),
    path: getRoute({ name: ROUTE_NAMES.DASHBOARD }),
  },
  {
    key: 'money_transfer',
    label: t('nav.money_transfer'),
    path: getRoute({ name: ROUTE_NAMES.MONEY_TRANSFER }),
  },
  {
    key: 'transaction_history',
    label: t('nav.transaction_history'),
    path: getRoute({ name: ROUTE_NAMES.TRANSACTION_HISTORY }),
  },
  {
    key: 'charts',
    label: t('nav.charts'),
    path: getRoute({ name: ROUTE_NAMES.CHARTS }),
  },
  {
    key: 'profile',
    label: t('nav.profile'),
    path: getRoute({ name: ROUTE_NAMES.PROFILE }),
  },
  {
    key: 'security',
    label: t('nav.security'),
    path: getRoute({ name: ROUTE_NAMES.SECURITY }),
  },
];

</script>

<template>
  <nav class="nav-menu">
    <ul class="list">
      <li
        v-for="link in links"
        :key="link.key"
        class="item"
      >
        <Button
          :as="RouterLink"
          :to="link.path"
          variant="transparent"
          class="link"
        >
          {{ link.label }}
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link {
  --button-justify-content: flex-start;
  --button-text-align: left;
  width: 100%;
}
</style>
