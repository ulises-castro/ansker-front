import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Discover from '@/views/Home';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/discover',
    name: 'Discover',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
];


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
