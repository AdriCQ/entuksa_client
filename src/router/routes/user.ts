import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const userRoutes: RouteRecordRaw = {
  path: '/user',
  component: () => import('layouts/MainLayout.vue'),

  children: [
    {
      path: '',
      name: ROUTE_NAME.USER_PROFILE,
      component: () => import('pages/user/Profile.vue'),
    },
  ]

};