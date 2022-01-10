import { RouteRecordRaw } from 'vue-router';
import { mainRoute } from './routes/main';
import { authRoute } from './routes/auth';
import { shopRoutes } from './routes/shop';
import { userRoutes } from './routes/user';
import { mapRoutes } from './routes/map';

const routes: RouteRecordRaw[] = [
    mainRoute,
    authRoute,
    mapRoutes,
    shopRoutes,
    userRoutes,
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
    },
];

export default routes;
