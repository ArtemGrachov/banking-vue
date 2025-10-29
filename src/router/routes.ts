import { defineAsyncComponent, type Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  DASHBOARD: 'DASHBOARD',
  MONEY_TRANSFER: 'MONEY_TRANSFER',
  TRANSACTION_HISTORY: 'TRANSACTION_HISTORY',
  CARDS: 'CARDS',
  CARD: 'CARD',
  ORDER_CARD: 'ORDER_CARD',
  CHARTS: 'CHARTS',
  PERSONAL_INFO: 'PERSONAL_INFO',
  SECURITY: 'SECURITY',
  REGISTRATION: 'REGISTRATION',
  LOGIN: 'LOGIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
  UI_KIT: 'UI_KIT',
};

export interface IRouteItem {
  name: string;
  path: string;
  component: Component | ReturnType<typeof defineAsyncComponent>;
}

const PLACEHOLDER_CMP = { template: '@todo' };

export const ROUTES: RouteRecordRaw[] = [
  {
    name: ROUTE_NAMES.DASHBOARD,
    path: '',
    component: () => import('@/views/dashboard/ViewDashboard.vue'),
  },
  {
    name: ROUTE_NAMES.MONEY_TRANSFER,
    path: 'money-transfer',
    component: () => import('@/views/transfer/ViewTransfer.vue'),
  },
  {
    name: ROUTE_NAMES.TRANSACTION_HISTORY,
    path: 'transaction-history',
    component: () => import('@/views/transaction-history/ViewTransactionHistory.vue'),
  },
  {
    name: ROUTE_NAMES.CHARTS,
    path: 'charts',
    component: () => import('@/views/charts/ViewCharts.vue'),
  },
  {
    name: ROUTE_NAMES.CARDS,
    path: 'cards',
    component: () => import('@/views/cards/ViewCards.vue'),
  },
  {
    name: ROUTE_NAMES.CARD,
    path: 'cards/:id',
    component: () => import('@/views/card/ViewCard.vue'),
  },
  {
    name: ROUTE_NAMES.ORDER_CARD,
    path: 'cards/order',
    component: () => import('@/views/order-card/ViewOrderCard.vue'),
  },
  {
    name: ROUTE_NAMES.PERSONAL_INFO,
    path: 'personal-info',
    component: () => import('@/views/personal-info/ViewPersonalInfo.vue'),
  },
  {
    name: ROUTE_NAMES.SECURITY,
    path: 'security',
    component: () => import('@/views/security/ViewSecurity.vue'),
  },
  {
    name: ROUTE_NAMES.LOGIN,
    path: 'login',
    component: () => import('@/views/login/ViewLogin.vue'),
  },
  {
    name: ROUTE_NAMES.REGISTRATION,
    path: 'registration',
    component: () => import('@/views/registration/ViewRegistration.vue'),
  },
  {
    name: ROUTE_NAMES.FORGOT_PASSWORD,
    path: 'forgot-password',
    component: () => import('@/views/forgot-password/ViewForgotPassword.vue'),
  },
  {
    name: ROUTE_NAMES.RESET_PASSWORD,
    path: 'reset-password',
    component: () => import('@/views/reset-password/ViewResetPassword.vue'),
  },
  {
    name: ROUTE_NAMES.UI_KIT,
    path: 'ui-kit',
    component: () => import('@/views/ui-kit/ViewUIKit.vue'),
  },
];

export const ROUTES_MAP = ROUTES.reduce((acc, curr, index) => {
  acc[curr.name! as string] = curr;
  return acc;
}, {} as Record<string, RouteRecordRaw>);
