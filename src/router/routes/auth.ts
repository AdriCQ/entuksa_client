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
      name: 'auth.pwd-recover',
      component: () => import('pages/auth/PasswordRecoverPage.vue'),
    },
    {
      path: 'password-reset',
      name: 'auth.pwd-reset',
      component: () => import('pages/auth/PasswordResetPage.vue'),
    }
  ]

};