import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const shopRoutes: RouteRecordRaw = {
  path: '/shop',
  component: () => import('layouts/MainLayout.vue'),

  children: [
    {
      path: 'stores/:id',
      name: ROUTE_NAME.SHOP_STORE,
      component: () => import('pages/shop/Store.vue'),
    }, {
      path: 'offers/:id',
      name: ROUTE_NAME.SHOP_OFFER,
      component: () => import('pages/shop/Offer.vue'),
    },
  ]

};