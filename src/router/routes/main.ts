import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const mainRoute: RouteRecordRaw = {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    name: ROUTE_NAME.MAIN_HOME,
    component: () => import('pages/Index.vue'),
    path: ''
  }],
};