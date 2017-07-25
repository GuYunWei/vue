import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import SysInfo from '@/components/SysInfo';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '/home',
        component: function (resolve) {
          require(['@/components/SysInfo.vue'], resolve)
        },
      }]
    },
    {
      path: '/plans',
      name: 'plans',
      component: Home,
      children: [{
        path: '/plans',
        component: function (resolve) {
          require(['@/components/Plans.vue'], resolve)
        },
      }]
    },
    {
      path: '/compile',
      name: 'compile',
      component: Home,
      children: [{
        path: '/compile',
        component: function (resolve) {
          require(['@/components/Compile.vue'], resolve)
        },
      }]
    },
    {
      path: '/setting',
      name: 'setting',
      component: Home,
      children: [{
        path: '/setting',
        component: function (resolve) {
          require(['@/components/Setting.vue'], resolve)
        },
      }]
    },
    {
      path: '/setting/personal',
      name: 'personal',
      component: Home,
      children: [{
        path: '/setting/personal',
        component: function (resolve) {
          require(['@/components/Personal.vue'], resolve)
        },
      }]
    },
    {
      path: '/setting/modify',
      name: 'modify',
      component: Home,
      children: [{
        path: '/setting/modify',
        component: function (resolve) {
          require(['@/components/Modify.vue'], resolve)
        },
      }]
    },
  ],
});

export default router
