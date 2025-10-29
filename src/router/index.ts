import { createRouter, createWebHistory } from 'vue-router'
import type { I18n } from 'vue-i18n';

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import { loadLocaleMessages } from '@/i18n/load-locale-messages';
import { ROUTE_NAMES, ROUTES_MAP } from '@/router/routes';

import LayoutDefault from '@/layouts/layout-default/LayoutDefault.vue';
import LayoutBase from '@/layouts/layout-default/LayoutBase.vue';
import LayoutAuth from '@/layouts/layout-default/LayoutAuth.vue';
import { useAuthStore } from '@/store/auth';

const PATH_LOCALE = LOCALES.join('|');

interface ISetupRouterOptions {
  i18n: I18n;
}

export const USER_ROUTES = [
  ROUTE_NAMES.DASHBOARD,
  ROUTE_NAMES.MONEY_TRANSFER,
  ROUTE_NAMES.TRANSACTION_HISTORY,
  ROUTE_NAMES.CHARTS,
  ROUTE_NAMES.CARD,
  ROUTE_NAMES.CARDS,
  ROUTE_NAMES.ORDER_CARD,
  ROUTE_NAMES.PERSONAL_INFO,
  ROUTE_NAMES.SECURITY,
];

const USER_ROUTES_SET = new Set(USER_ROUTES);

export const setupRouter = ({ i18n }: ISetupRouterOptions) => {
  const authStore = useAuthStore();

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: `/:locale(${PATH_LOCALE})?`,
        name: 'root',
        component: LayoutBase,
        children: [
          {
            name: 'LayoutDefault',
            component: LayoutDefault,
            path: '',
            children: [
              ROUTES_MAP[ROUTE_NAMES.DASHBOARD]!,
              ROUTES_MAP[ROUTE_NAMES.MONEY_TRANSFER]!,
              ROUTES_MAP[ROUTE_NAMES.TRANSACTION_HISTORY]!,
              ROUTES_MAP[ROUTE_NAMES.CHARTS]!,
              ROUTES_MAP[ROUTE_NAMES.CARD]!,
              ROUTES_MAP[ROUTE_NAMES.CARDS]!,
              ROUTES_MAP[ROUTE_NAMES.ORDER_CARD]!,
              ROUTES_MAP[ROUTE_NAMES.PERSONAL_INFO]!,
              ROUTES_MAP[ROUTE_NAMES.SECURITY]!,
            ],
          },
          {
            name: 'LayoutAuth',
            component: LayoutAuth,
            path: '',
            children: [
              ROUTES_MAP[ROUTE_NAMES.REGISTRATION]!,
              ROUTES_MAP[ROUTE_NAMES.LOGIN]!,
              ROUTES_MAP[ROUTE_NAMES.FORGOT_PASSWORD]!,
              ROUTES_MAP[ROUTE_NAMES.RESET_PASSWORD]!,
            ],
          },
          ROUTES_MAP[ROUTE_NAMES.UI_KIT]!,
          {
            name: 'ERROR',
            path: ':pathMatch(.*)*',
            component: () => import('@/views/error/ViewError.vue'),
          },
        ],
      },
    ],
  });

  router.beforeEach(async (to, from, next) => {
    const locale = (to.params.locale as string) || DEFAULT_LOCALE;
    i18n.global.locale = locale;

    if (!i18n.global.availableLocales.includes(locale)) {
      await loadLocaleMessages(i18n, locale)
    }

    if (locale === DEFAULT_LOCALE && to.params.locale) {
      const redirect = {
        ...to,
        params: {
          ...to.params,
        },
      };

      delete redirect.params.locale;

      return next(redirect);
    }

    next();
  });

  router.beforeEach((to, from, next) => {
    if (!authStore.isAuthorized && USER_ROUTES_SET.has(to.name as string)) {
      return next({
        name: ROUTE_NAMES.LOGIN,
      });
    } else if (authStore.isAuthorized && !USER_ROUTES_SET.has(to.name as string)) {
      return next({
        name: ROUTE_NAMES.DASHBOARD,
      });
    }

    next();
  });

  return router;
}
