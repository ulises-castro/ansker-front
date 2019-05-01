import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

import Home from '@/views/Home';
import Secret from '@/views/Secret';
import Discover from '@/views/Discover';
import PublishSecret from '@/views/Publish';
import { Terms, Policies } from '@/views/Home'

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
    name: 'PublishSecret',
    component: PublishSecret,
    meta: {
      requiresAuth: true,
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/secret/:secretId',
    name: 'Secret',
    component: Secret,
    meta: {
      requiresAuth: true,
    }
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
  }
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
      return next({ name: 'Discover' });
    }

    next();
  }
});

export default router;
