import Vue from 'vue';
import Router from 'vue-router';

import RouterComponent from './components/RouterComponent.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "start" */ './views/dashboard/Start.vue'),
      children: [
        {
          path: 'login',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
        },
        {
          path: 'steamLogin',
          component: () => import(/* webpackChunkName: "steamlogin" */ './views/SteamLogin.vue'),
        },
        {
          path: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard/Dashboard.vue'),
          children: [
            {
              path: 'main',
              component: () => import(/* webpackChunkName: "dashboard-main" */ './views/dashboard/Main.vue'),
            },
            {
              path: 'profile',
              component: RouterComponent,
              redirect: 'profile/view',
              children: [
                {
                  path: 'view',
                  component: () => import(
                    /* webpackChunkName: "dashboard-profile" */ './views/dashboard/profile/UserProfile.vue'),
                },
              ],
            },
            {
              path: 'faq',
              component: () => import(/* webpackChunkName: "dashboard-faq" */ './views/dashboard/FAQ.vue'),
            },
            {
              path: 'filters',
              component: () => import(
                /* webpackChunkName: "dashboard-tables-csmoneytable-filters */ './views/dashboard/filters/FiltersPage.vue'),
              children: [
                {
                  path: 'csmoneytable',
                  component: () => import(
                    /* webpackChunkName: "dashboard-tables-csmoneytable" */ './views/dashboard/filters/csmoney/CSMoneyFilters.vue'),
                },
              ],
            },
            {
              path: 'tables',
              component: () => import(/* webpackChunkName: "dashboard-tables" */ './views/dashboard/tables/Table.vue'),
              redirect: 'tables/csmoneytable',
              children: [
                {
                  path: 'csmoneytable',
                  component: () => import(
                    /* webpackChunkName: "dashboard-tables-csmoneytable" */ './views/dashboard/tables/csmoney/TableCSMoney.vue'),
                },
              ],
            },
            {
              path: 'admin',
              component: () => import(/* webpackChunkName: "dashboard-admin" */ './views/dashboard/admin/Admin.vue'),
              redirect: 'admin/users/all',
              children: [
                {
                  path: 'users',
                  redirect: 'users/all',
                },
                {
                  path: 'users/all',
                  component: () => import(
                    /* webpackChunkName: "dashboard-admin-users" */ './views/dashboard/admin/AdminUsers.vue'),
                },
                {
                  path: 'users/edit/:id',
                  name: 'main-admin-users-edit',
                  component: () => import(
                    /* webpackChunkName: "main-admin-users-edit" */ './views/dashboard/admin/ManageUser.vue'),
                },
                {
                  path: 'users/create',
                  name: 'main-admin-users-create',
                  component: () => import(
                    /* webpackChunkName: "dashboard-admin-users-create" */ './views/dashboard/admin/CreateUser.vue'),
                },

              ],
            },
          ],
        },
      ],
    },
    {
      path: '/rules',
      component: () => import(/* webpackChunkName: "dashboard-rules" */ './views/Rules.vue'),
    },
    {
      path: '/*', redirect: '/',
    },
  ],
});
