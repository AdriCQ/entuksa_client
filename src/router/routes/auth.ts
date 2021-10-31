import { ROUTE_NAME } from 'src/helpers';
import { RouteRecordRaw } from 'vue-router';

export const authRoute: RouteRecordRaw = {
  path: '/auth',
  component: () => import('layouts/AuthLayout.vue'),

  children: [
    {
      path: '',
      name: 'auth.login',
      component: () => import('pages/auth/LoginPage.vue'),
    },
    {
      path: 'password-recover',
      name: ROUTE_NAME.AUTH_PASSWORD_RECOVER,
      component: () => import('pages/auth/PasswordRecoverPage.vue'),
    },
    {
      path: 'password-reset',
      name: ROUTE_NAME.AUTH_PASSWORD_RESET,
      component: () => import('pages/auth/PasswordResetPage.vue'),
    },
    {
      path: 'register',
      name: ROUTE_NAME.AUTH_REGISTER,
      component: () => import('pages/auth/RegisterPage.vue'),
    }
  ]

};