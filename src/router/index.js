import Vue from 'vue';
import Router from 'vue-router';
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/publish',
    name: 'PublishSecret',
    component: PublishSecret,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/secret/:secretId',
    name: 'Secret',
    component: Secret,
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


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
