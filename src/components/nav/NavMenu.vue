<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import Button, { type ButtonVariants } from '@/components/buttons/Button.vue';

type Emits = {
  (e: 'navigate'): void;
}

const emit = defineEmits<Emits>();

const { t } = useI18n();
const getRoute = useGetRoute();

const links = [
  {
    key: 'dashboard',
    label: t('nav.dashboard'),
    path: getRoute({ name: ROUTE_NAMES.DASHBOARD }),
    icon: 'widgets',
  },
  {
    key: 'money_transfer',
    label: t('nav.cards'),
    path: getRoute({ name: ROUTE_NAMES.CARDS }),
    icon: 'credit_card',
  },
  {
    key: 'money_transfer',
    label: t('nav.money_transfer'),
    path: getRoute({ name: ROUTE_NAMES.MONEY_TRANSFER }),
    icon: 'output',
    variant: 'primary' as ButtonVariants,
  },
  {
    key: 'transaction_history',
    label: t('nav.transaction_history'),
    path: getRoute({ name: ROUTE_NAMES.TRANSACTION_HISTORY }),
    icon: 'list',
  },
  {
    key: 'charts',
    label: t('nav.charts'),
    path: getRoute({ name: ROUTE_NAMES.CHARTS }),
    icon: 'clock_loader_10',
  },
  {
    key: 'profile',
    label: t('nav.profile'),
    path: getRoute({ name: ROUTE_NAMES.PROFILE }),
    icon: 'account_circle',
  },
  {
    key: 'security',
    label: t('nav.security'),
    path: getRoute({ name: ROUTE_NAMES.SECURITY }),
    icon: 'security',
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
          :variant="link.variant ?? 'transparent'"
          class="link"
          @click="emit('navigate')"
        >
          <span class="material-symbols-outlined">
            {{ link.icon }}
          </span>
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
  --button-border-radius: 0;
  width: 100%;
}
</style>
