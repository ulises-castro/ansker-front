import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Discover from '@/views/Discover';
import PublishSecret from '@/views/Publish';

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
  }
];


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
