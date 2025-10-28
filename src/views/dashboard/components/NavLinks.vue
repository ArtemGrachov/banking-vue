<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import Button, { type ButtonVariants } from '@/components/buttons/Button.vue';

const { t } = useI18n();
const getRoute = useGetRoute();

interface ILink {
  key: string;
  path: ReturnType<typeof getRoute>;
  icon: string;
  label: string;
  variant: ButtonVariants;
  className?: string;
}

const links: ILink[] = [
  {
    key: 'money_transfer',
    path: getRoute({ name: ROUTE_NAMES.MONEY_TRANSFER }),
    icon: 'output',
    label: t('view_dashboard.nav_links.link_money_transfer'),
    variant: 'primary',
  },
  {
    key: 'cards',
    path: getRoute({ name: ROUTE_NAMES.CARDS }),
    icon: 'credit_card',
    label: t('view_dashboard.nav_links.link_cards'),
    variant: 'transparent',
    className: '_mobile',
  },
  {
    key: 'order_card',
    path: getRoute({ name: ROUTE_NAMES.ORDER_CARD }),
    icon: 'add_card',
    label: t('view_dashboard.nav_links.link_order_card'),
    variant: 'transparent',
  },
  {
    key: 'charts',
    path: getRoute({ name: ROUTE_NAMES.CHARTS }),
    icon: 'clock_loader_10',
    label: t('view_dashboard.nav_links.link_charts'),
    variant: 'transparent',
    className: '_mobile',
  },
];
</script>

<template>
  <ul class="list">
    <li
      v-for="link in links"
      :key="link.key"
      class="item"
    >
      <Button
        :as="RouterLink"
        :to="link.path"
        :variant="link.variant"
        class="link"
        :class="link.className"
      >
        <span class="material-symbols-outlined">
          {{ link.icon }}
        </span>
        {{ link.label }}
      </Button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 1px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.link {
  white-space: nowrap;

  &._mobile {
    @include breakpoints.lg() {
      display: none;
    }
  }
}
</style>
