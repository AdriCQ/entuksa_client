import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const mapRoutes: RouteRecordRaw = {
    path: '/map',
    component: () => import('layouts/MainLayout.vue'),

    children: [
        {
            path: 'my-locations',
            name: ROUTE_NAME.MAP_MY_LOCATIONS,
            component: () => import('pages/map/MyLocations.vue'),
        }
    ]

};