<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/router/routes';

import { useGetRoute } from '@/composables/routing/get-route';
import { useLogout } from '@/composables/auth/logout';
import Button, { type ButtonVariants } from '@/components/buttons/Button.vue';

type Emits = {
  (e: 'navigate'): void;
}

const emit = defineEmits<Emits>();

const { t } = useI18n();
const getRoute = useGetRoute();
const { logout } = useLogout();

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
    path: getRoute({ name: ROUTE_NAMES.IDENTITY_VERIFICATION }),
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
      <li class="item _separate">
        <Button
          type="button"
          class="link"
          variant="transparent"
          @click="logout(); emit('navigate')"
        >
          <span class="material-symbols-outlined">
            logout
          </span>
          Logout
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/themes.scss' as themes;

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: var(--nav-list-height, 100%);
}

.item {
  &._separate {
    margin-top: auto;
  }
}

.link {
  --button-justify-content: flex-start;
  --button-text-align: left;
  --button-font-weight: 500;

  width: 100%;
}

@include themes.component-theme-dark() {
  .link {
    --button-text-color: #ff5e5e;
  }
}

@include themes.component-theme-light() {
  .link {
    --button-text-color: darkred;
  }
}
</style>
