<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useModal } from 'vue-final-modal';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { ROUTE_NAMES } from '@/router/routes';

import IconButton from '@/components/buttons/IconButton.vue';
import LanguageSwitch from '@/components/language/LanguageSwitch.vue';
import ThemeToggle from '@/components/other/ThemeToggle.vue';

const MobileNav = defineAsyncComponent(() => import('@/views/mobile-nav/MobileNav.vue'));

const { t } = useI18n();
const route = useRoute();

const title = computed(() => {
  switch (route.name) {
    case ROUTE_NAMES.DASHBOARD: {
      return t('page_title.dashboard');
    }
    case ROUTE_NAMES.MONEY_TRANSFER: {
      return t('page_title.money_transfer');
    }
    case ROUTE_NAMES.TRANSACTION_HISTORY: {
      return t('page_title.transaction_history');
    }
    case ROUTE_NAMES.CARD:
    case ROUTE_NAMES.CARDS: {
      return t('page_title.cards');
    }
    case ROUTE_NAMES.ORDER_CARD: {
      return t('page_title.order_card');
    }
    case ROUTE_NAMES.CHARTS: {
      return t('page_title.charts');
    }
    case ROUTE_NAMES.PERSONAL_INFO: {
      return t('page_title.personal_info');
    }
    case ROUTE_NAMES.SECURITY: {
      return t('page_title.security');
    }
    case ROUTE_NAMES.REGISTRATION: {
      return t('page_title.registration');
    }
    case ROUTE_NAMES.LOGIN: {
      return t('page_title.login');
    }
    case ROUTE_NAMES.FORGOT_PASSWORD: {
      return t('page_title.forgot_password');
    }
    case ROUTE_NAMES.RESET_PASSWORD: {
      return t('page_title.reset_password');
    }
  }

  return '';
});

const { open: openMobileNav, close } = useModal({
  component: MobileNav,
  attrs: {
    onClose: () => close(),
  },
});
</script>

<template>
  <header class="header">
    <IconButton
      type="button"
      class="menu-toggle"
      @click="openMobileNav"
    >
      <span class="material-symbols-outlined">
        more_vert
      </span>
    </IconButton>
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="switch">
      <ThemeToggle class="theme-toggle" />
      <div class="language-switch">
        <LanguageSwitch />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '/src/styles/mixins/layout.scss' as layout;
@use '/src/styles/mixins/breakpoints.scss' as breakpoints;
@use '/src/styles/mixins/buttons.scss' as buttons;
@use '/src/styles/mixins/headings.scss' as headings;
@use '/src/styles/mixins/themes.scss' as themes;

.header {
  --header-height: 74px;
  --heading-color: var(--header-color);
  --text-color: var(--header-color);
  --icon-button-color: var(--header-icon-button-color);
  --icon-button-hover-color: var(--header-icon-button-hover-color);
  --icon-button-active-color: var(--header-icon-button-active-color);

  height: var(--header-height);
  background: var(--header-background);
  display: flex;
  align-items: center;
  color: var(--text-color);
  box-shadow: 0 15px 30px 0 rgba(black, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;

  @include breakpoints.lg() {
    padding: 0 24px;
  }
}

.menu-toggle,
.theme-toggle {
  flex: 0 0 auto;
  height: var(--header-height);
  width: var(--header-height);
  --icon-button-height: var(--header-height);
  --icon-button-width: var(--header-height);
}

.menu-toggle {
  @include breakpoints.lg() {
    --button-display: none;
    display: none;
  }
}

.menu-toggle {
  @include breakpoints.lg() {
    --button-display: none;
  }
}

.title {
  @include headings.h3();

  margin: 0;
  letter-spacing: 0.1em;
  font-style: italic;
  text-align: center;
  flex: 1 1 auto;

  @include breakpoints.lg() {
    text-align: left;
  }
}

.language-switch {
  display: none;

  @include breakpoints.lg() {
    display: flex;
  }
}

.switch {
  @include breakpoints.lg() {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

@include themes.component-theme-dark() {
  .header {
    --header-icon-button-color: red;
    --header-icon-button-hover-color: orange;
    --header-icon-button-active-color: white;
  }
}

@include themes.component-theme-light() {
  .header {
    --header-icon-button-color: white;
    --header-icon-button-hover-color: orange;
    --header-icon-button-active-color: yellow;
  }
}
</style>
