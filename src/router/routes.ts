import { RouteRecordRaw } from 'vue-router';
import { mainRoute } from './routes/main';
import { authRoute } from './routes/auth';

const routes: RouteRecordRaw[] = [
  mainRoute,
  authRoute,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
