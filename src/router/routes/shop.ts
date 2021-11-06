import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const shopRoutes: RouteRecordRaw = {
  path: '/shop',
  component: () => import('layouts/MainLayout.vue'),

  children: [
    {
      path: 'store',
      name: ROUTE_NAME.SHOP_STORE,
      component: () => import('pages/shop/Store.vue'),
    },
  ]

};