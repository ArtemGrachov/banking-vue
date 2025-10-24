import { defineAsyncComponent, type Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  DASHBOARD: 'DASHBOARD',
  MONEY_TRANSFER: 'MONEY_TRANSFER',
  TRANSACTION_HISTORY: 'TRANSACTION_HISTORY',
  CHARTS: 'CHARTS',
  PROFILE: 'PROFILE',
  SECURITY: 'SECURITY',
  REGISTRATION: 'REGISTRATION',
  LOGIN: 'LOGIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
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
    component: PLACEHOLDER_CMP,
  },
  {
    name: ROUTE_NAMES.TRANSACTION_HISTORY,
    path: 'transaction-history',
    component: PLACEHOLDER_CMP,
  },
  {
    name: ROUTE_NAMES.CHARTS,
    path: 'charts',
    component: PLACEHOLDER_CMP,
  },
  {
    name: ROUTE_NAMES.PROFILE,
    path: 'profile',
    component: PLACEHOLDER_CMP,
  },
  {
    name: ROUTE_NAMES.SECURITY,
    path: 'security',
    component: PLACEHOLDER_CMP,
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
];

export const ROUTES_MAP = ROUTES.reduce((acc, curr, index) => {
  acc[curr.name! as string] = curr;
  return acc;
}, {} as Record<string, RouteRecordRaw>);
