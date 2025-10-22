import { createRouter, createWebHistory } from 'vue-router'
import type { I18n } from 'vue-i18n';

import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import { loadLocaleMessages } from '@/i18n/load-locale-messages';
import { ROUTE_NAMES, ROUTES_MAP } from '@/router/routes';

import LayoutDefault from '@/layouts/layout-default/LayoutDefault.vue';
import LayoutBase from '@/layouts/layout-default/LayoutBase.vue';

const PATH_LOCALE = LOCALES.join('|');

interface ISetupRouterOptions {
  i18n: I18n;
}

export const setupRouter = ({ i18n }: ISetupRouterOptions) => {
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
              ROUTES_MAP[ROUTE_NAMES.PROFILE]!,
              ROUTES_MAP[ROUTE_NAMES.SECURITY]!,
            ],
          },
          ROUTES_MAP[ROUTE_NAMES.REGISTRATION]!,
          ROUTES_MAP[ROUTE_NAMES.LOGIN]!,
          ROUTES_MAP[ROUTE_NAMES.FORGOT_PASSWORD]!,
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

  return router;
}
