import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Test from '@/components/Test';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/test',
      name: 'test',
      component: function (resolve) {
        require(['@/components/Test.vue'], resolve)
      }
    },
    {
      path: '/home',
      name: 'home',
      component: function (resolve) {
        require(['@/components/home.vue'], resolve)
      }
    },
  ],
});

export default router
