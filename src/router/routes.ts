import { defineAsyncComponent, type Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const ROUTE_NAMES = {
  HOME: 'HOME',
};

export interface IRouteItem {
  name: string;
  path: string;
  component: Component | ReturnType<typeof defineAsyncComponent>;
}

export const ROUTES: RouteRecordRaw[] = [
  {
    name: ROUTE_NAMES.HOME,
    path: '',
    component: () => import('@/views/dashboard/ViewDashboard.vue'),
  },
];

export const ROUTES_MAP = ROUTES.reduce((acc, curr, index) => {
  acc[curr.name! as string] = curr;
  return acc;
}, {} as Record<string, RouteRecordRaw>);
