import { createRouter, createWebHistory } from 'vue-router'

import LayoutDefault from '@/layouts/layout-default/LayoutDefault.vue';
import ViewDashboard from '@/views/dashboard/ViewDashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: LayoutDefault,
      children: [{
        path: '',
        component: ViewDashboard,
      }]
    },
  ],
})

export default router
