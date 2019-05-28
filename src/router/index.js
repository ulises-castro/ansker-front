import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Home, { Terms, Policies } from '@/views/Home';
import Discover from '@/views/Discover';
import PublishSecret from '@/views/Publish';

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}`)
}

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/publish',
    name: 'publish-secret',
    component: PublishSecret,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/secret/:secretId',
    name: 'Secret',
    component: loadView('Secret'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/more',
    name: 'More',
    component: loadView('More'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/get-token/:token',
    name: 'getToken',
    component: loadView('getToken'),
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
  },
  {
    path: '/policies',
    name: 'Policies',
    component: Policies,
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLogged) {
      next();
      return;
    }

    next({ name: 'Home' });
  } else {
    if (store.getters.isLogged) {
      next({ name: 'Discover' });
      return;
    }

    next();
  }
});

export default router;
